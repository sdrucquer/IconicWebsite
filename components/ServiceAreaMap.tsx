"use client";

import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  extendedServiceTowns,
  groupedPrimaryTowns,
  mapBounds,
  primaryServiceTowns,
  serviceAreaPolygon,
  type ServiceAreaTown
} from "@/data/service-area-map";
import { SMS_LINK } from "@/lib/constants";

type MapboxMap = {
  addControl: (control: unknown, position?: string) => void;
  addLayer: (layer: Record<string, unknown>) => void;
  addSource: (id: string, source: Record<string, unknown>) => void;
  flyTo: (options: Record<string, unknown>) => void;
  loaded: () => boolean;
  on: (event: string, handler: () => void) => void;
  remove: () => void;
};

type MapboxMarker = {
  addTo: (map: MapboxMap) => MapboxMarker;
  remove: () => void;
  setLngLat: (coordinates: [number, number]) => MapboxMarker;
};

type MapboxGL = {
  accessToken: string;
  Map: new (options: Record<string, unknown>) => MapboxMap;
  Marker: new (options: { element: HTMLElement }) => MapboxMarker;
  NavigationControl: new (options?: Record<string, unknown>) => unknown;
};

declare global {
  interface Window {
    mapboxgl?: MapboxGL;
  }
}

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ??
  "pk.eyJ1IjoiaWNvbmljbGFuZHNjYXBpbmciLCJhIjoiY21vaGNxZnZ0MDF6MTJxcHZiZmc1ZG9wNiJ9.9kUdj_cd4My8zE12Bdowwg";

const mapboxScriptId = "mapbox-gl-js";
const mapboxCssId = "mapbox-gl-css";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function ensureMapboxAssets() {
  return new Promise<MapboxGL>((resolve, reject) => {
    if (window.mapboxgl) {
      resolve(window.mapboxgl);
      return;
    }

    if (!document.getElementById(mapboxCssId)) {
      const link = document.createElement("link");
      link.id = mapboxCssId;
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css";
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById(mapboxScriptId) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.mapboxgl) {
          resolve(window.mapboxgl);
        } else {
          reject(new Error("Mapbox GL loaded without exposing mapboxgl."));
        }
      });
      existingScript.addEventListener("error", () => reject(new Error("Mapbox GL failed to load.")));
      return;
    }

    const script = document.createElement("script");
    script.id = mapboxScriptId;
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js";
    script.async = true;
    script.onload = () => {
      if (window.mapboxgl) {
        resolve(window.mapboxgl);
      } else {
        reject(new Error("Mapbox GL loaded without exposing mapboxgl."));
      }
    };
    script.onerror = () => reject(new Error("Mapbox GL failed to load."));
    document.body.appendChild(script);
  });
}

function townMatches(town: ServiceAreaTown, query: string) {
  const names = [town.name, ...(town.aliases ?? [])].map(normalize);
  return names.some((name) => name.includes(query) || query.includes(name));
}

export function ServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markerElementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const searchMarkerRef = useRef<MapboxMarker | null>(null);
  const [selectedTown, setSelectedTown] = useState<ServiceAreaTown | null>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<"primary" | "extended" | "unknown" | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const focusTown = useCallback((town: ServiceAreaTown, source: "primary" | "extended") => {
    setSelectedTown(town);
    setResult(source);

    markerElementsRef.current.forEach((element, townName) => {
      element.classList.toggle("is-active", townName === town.name);
    });

    const map = mapRef.current;
    if (!map?.loaded()) {
      return;
    }

    if (source === "extended" && window.mapboxgl) {
      searchMarkerRef.current?.remove();
      const element = document.createElement("div");
      element.className = "service-area-search-marker";
      searchMarkerRef.current = new window.mapboxgl.Marker({ element })
        .setLngLat([town.lng, town.lat])
        .addTo(map);
    } else {
      searchMarkerRef.current?.remove();
      searchMarkerRef.current = null;
    }

    map.flyTo({ center: [town.lng, town.lat], zoom: source === "primary" ? 11.3 : 11, duration: 900 });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const markerElements = markerElementsRef.current;

    ensureMapboxAssets()
      .then((mapboxgl) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        mapboxgl.accessToken = MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
          attributionControl: false,
          center: [-75.62, 40.2],
          container: containerRef.current,
          maxBounds: mapBounds,
          maxZoom: 14,
          minZoom: 9.3,
          style: "mapbox://styles/mapbox/light-v11",
          zoom: 9.5
        });

        mapRef.current = map;
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

        map.on("load", () => {
          map.addSource("service-area", {
            data: {
              geometry: {
                coordinates: [serviceAreaPolygon],
                type: "Polygon"
              },
              properties: {},
              type: "Feature"
            },
            type: "geojson"
          });

          map.addLayer({
            id: "service-area-fill",
            paint: {
              "fill-color": "#2D5440",
              "fill-opacity": 0.12
            },
            source: "service-area",
            type: "fill"
          });

          map.addLayer({
            id: "service-area-outline",
            paint: {
              "line-color": "#1B3A2A",
              "line-dasharray": [2, 3],
              "line-opacity": 0.45,
              "line-width": 2
            },
            source: "service-area",
            type: "line"
          });

          primaryServiceTowns.forEach((town) => {
            const element = document.createElement("button");
            element.type = "button";
            element.className = "service-area-town-marker";
            element.setAttribute("aria-label", `Show ${town.name}`);
            element.addEventListener("click", () => focusTown(town, "primary"));
            markerElements.set(town.name, element);

            new mapboxgl.Marker({ element }).setLngLat([town.lng, town.lat]).addTo(map);
          });
        });
      })
      .catch(() => {
        if (!cancelled) {
          setMapError("The interactive map could not load. You can still use the town search and list below.");
        }
      });

    return () => {
      cancelled = true;
      searchMarkerRef.current?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
      markerElements.clear();
    };
  }, [focusTown]);

  useEffect(() => {
    const onTownFocus = (event: Event) => {
      const townName = (event as CustomEvent<string>).detail;
      const town = primaryServiceTowns.find((item) => item.name === townName);
      if (town) {
        focusTown(town, "primary");
      }
    };

    window.addEventListener("service-area-focus-town", onTownFocus);
    return () => window.removeEventListener("service-area-focus-town", onTownFocus);
  }, [focusTown]);

  const onSearchChange = (value: string) => {
    setQuery(value);
    const normalizedQuery = normalize(value);

    if (normalizedQuery.length < 2) {
      setResult(null);
      return;
    }

    const match = [...primaryServiceTowns, ...extendedServiceTowns].find((town) => townMatches(town, normalizedQuery));

    if (!match) {
      setResult("unknown");
      setSelectedTown(null);
      markerElementsRef.current.forEach((element) => element.classList.remove("is-active"));
      searchMarkerRef.current?.remove();
      searchMarkerRef.current = null;
      return;
    }

    const isPrimary = primaryServiceTowns.some((town) => town.name === match.name);
    focusTown(match, isPrimary ? "primary" : "extended");
  };

  return (
    <div id="service-area-map" className="grid scroll-mt-28 gap-10 lg:gap-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="meta text-brand-forest">Find Your Town</p>
          <h2 className="mt-5 font-display text-[clamp(2.35rem,5vw,4rem)] font-normal leading-[1.03] tracking-[-0.025em] text-brand-ink">
            Pin it on the <em className="text-brand-forest">map.</em>
          </h2>
        </div>

        <div>
          <label className="sr-only" htmlFor="town-search">
            Type your town to check service availability
          </label>
          <div className="relative">
            <input
              id="town-search"
              value={query}
              onChange={(event) => onSearchChange(event.target.value)}
              autoComplete="off"
              placeholder="Type your town to check..."
              className="h-16 w-full rounded-full border border-brand-sage/35 bg-white px-6 pr-14 text-[0.95rem] text-brand-ink shadow-sm outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
            />
            <Search className="pointer-events-none absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ink/38" />
          </div>

          {result ? (
            <div
              className={`mt-4 rounded-2xl border px-5 py-4 text-sm leading-relaxed ${
                result === "unknown"
                  ? "border-brand-gold/25 bg-brand-gold/10 text-brand-ink"
                  : "border-brand-forest/15 bg-brand-forest/10 text-brand-forest"
              }`}
            >
              {result === "primary" && selectedTown ? (
                <>
                  <strong>Yes, we serve {selectedTown.name}</strong> ({selectedTown.county}). All listed towns get full service.
                  <br />
                  <a href="#quote" className="mt-1 inline-flex font-semibold underline underline-offset-4">
                    Get a free quote
                  </a>
                </>
              ) : null}
              {result === "extended" && selectedTown ? (
                <>
                  <strong>Yes, we work in {selectedTown.name} regularly.</strong> It&apos;s not on our primary list, but we&apos;re there often.
                  <br />
                  <a href={SMS_LINK} className="mt-1 inline-flex font-semibold underline underline-offset-4">
                    Text us your address
                  </a>
                </>
              ) : null}
              {result === "unknown" ? (
                <>
                  <strong>Not on our regular list, but you might still be in range.</strong>
                  <br />
                  We work outside these towns regularly.{" "}
                  <a href={SMS_LINK} className="font-semibold underline underline-offset-4">
                    Text us your address
                  </a>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className="service-area-map-wrap relative overflow-hidden rounded-[1.5rem] bg-brand-cream shadow-[0_24px_60px_rgba(20,44,32,0.12)]">
        <div ref={containerRef} className="h-[25rem] w-full md:h-[30rem] lg:h-[37.5rem]" />
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 max-w-none rounded-2xl bg-brand-cream px-5 py-4 shadow-[0_12px_32px_rgba(20,44,32,0.15)] md:bottom-6 md:left-6 md:right-auto md:max-w-sm md:px-7 md:py-6">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-forest">
            {selectedTown?.county ?? "Tap a pin"}
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-[-0.015em] text-brand-ink">
            {selectedTown?.name ?? "Click any town to see details"}
          </h3>
          <p className="mt-2 text-sm leading-[1.55] text-brand-ink/72">
            {selectedTown?.blurb ?? "All twelve listed towns get full service: same fast quotes, same crews, same standard of work."}
          </p>
        </div>
        {mapError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-cream px-6 text-center">
            <p className="max-w-md text-sm leading-relaxed text-brand-ink/72">{mapError}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ServiceAreaTownList() {
  const focusTown = (townName: string) => {
    document.getElementById("service-area-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("service-area-focus-town", { detail: townName }));
  };

  return (
    <div className="grid gap-12 lg:grid-cols-3 lg:gap-14">
      {groupedPrimaryTowns.map((group) => (
        <section key={group.county}>
          <div className="flex items-baseline justify-between border-b-2 border-brand-forest pb-4">
            <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-brand-ink">{group.county}</h3>
            <p className="font-display text-sm italic text-brand-forest">
              {group.towns.length} {group.towns.length === 1 ? "town" : "towns"}
            </p>
          </div>
          <div className="divide-y divide-brand-sage/30">
            {group.towns.map((town) => (
              <button
                key={town.name}
                type="button"
                onClick={() => focusTown(town.name)}
                className="group flex w-full items-center gap-4 py-4 text-left font-display text-xl font-medium tracking-[-0.005em] text-brand-ink transition hover:pl-2 hover:text-brand-forest"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-forest transition group-hover:scale-150 group-hover:bg-brand-gold" />
                {town.name}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
