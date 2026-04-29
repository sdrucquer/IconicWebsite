"use client";

import { useEffect, useRef, useState } from "react";
import { mapBounds, serviceAreaPolygon } from "@/data/service-area-map";

type ContactMapboxMap = {
  addControl: (control: unknown, position?: string) => void;
  addLayer: (layer: Record<string, unknown>) => void;
  addSource: (id: string, source: Record<string, unknown>) => void;
  on: (event: string, handler: () => void) => void;
  remove: () => void;
};

type ContactMapboxMarker = {
  addTo: (map: ContactMapboxMap) => ContactMapboxMarker;
  setLngLat: (coordinates: [number, number]) => ContactMapboxMarker;
};

type ContactMapboxGL = {
  accessToken: string;
  Map: new (options: Record<string, unknown>) => ContactMapboxMap;
  Marker: new (options: { element: HTMLElement }) => ContactMapboxMarker;
  NavigationControl: new (options?: Record<string, unknown>) => unknown;
};

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ??
  "pk.eyJ1IjoiaWNvbmljbGFuZHNjYXBpbmciLCJhIjoiY21vaGNxZnZ0MDF6MTJxcHZiZmc1ZG9wNiJ9.9kUdj_cd4My8zE12Bdowwg";

const mapboxScriptId = "mapbox-gl-js";
const mapboxCssId = "mapbox-gl-css";

function ensureMapboxAssets() {
  return new Promise<ContactMapboxGL>((resolve, reject) => {
    const mapboxWindow = globalThis as unknown as { mapboxgl?: ContactMapboxGL };

    if (mapboxWindow.mapboxgl) {
      resolve(mapboxWindow.mapboxgl);
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
        if (mapboxWindow.mapboxgl) {
          resolve(mapboxWindow.mapboxgl);
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
      if (mapboxWindow.mapboxgl) {
        resolve(mapboxWindow.mapboxgl);
      } else {
        reject(new Error("Mapbox GL loaded without exposing mapboxgl."));
      }
    };
    script.onerror = () => reject(new Error("Mapbox GL failed to load."));
    document.body.appendChild(script);
  });
}

export function ContactServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<ContactMapboxMap | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    ensureMapboxAssets()
      .then((mapboxgl) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        mapboxgl.accessToken = MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
          attributionControl: false,
          center: [-75.6499, 40.2454],
          container: containerRef.current,
          interactive: true,
          maxBounds: mapBounds,
          maxZoom: 13,
          minZoom: 9,
          style: "mapbox://styles/mapbox/light-v11",
          zoom: 10
        });

        mapRef.current = map;
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

        map.on("load", () => {
          map.addSource("contact-service-area", {
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
            id: "contact-service-area-fill",
            paint: {
              "fill-color": "#2D5440",
              "fill-opacity": 0.12
            },
            source: "contact-service-area",
            type: "fill"
          });

          map.addLayer({
            id: "contact-service-area-outline",
            paint: {
              "line-color": "#1B3A2A",
              "line-dasharray": [2, 3],
              "line-opacity": 0.4,
              "line-width": 2
            },
            source: "contact-service-area",
            type: "line"
          });

          const markerElement = document.createElement("div");
          markerElement.className = "contact-hq-marker";
          new mapboxgl.Marker({ element: markerElement }).setLngLat([-75.6499, 40.2454]).addTo(map);
        });
      })
      .catch(() => {
        if (!cancelled) {
          setMapError(true);
        }
      });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="contact-map-wrap relative h-[300px] overflow-hidden rounded-3xl bg-brand-cream shadow-[0_16px_40px_rgba(20,44,32,0.1)] md:h-[360px]">
      <div ref={containerRef} className="h-full w-full" />
      {mapError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-cream px-6 text-center">
          <p className="max-w-md text-sm leading-relaxed text-brand-ink/70">
            The interactive map could not load, but we&apos;re based in Pottstown and serve Montgomery, Chester, and Berks Counties.
          </p>
        </div>
      ) : null}
    </div>
  );
}
