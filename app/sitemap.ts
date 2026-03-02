import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { resourceArticles } from "@/data/resources";
import { services } from "@/data/services";
import { SITE_URL } from "@/lib/constants";

const STATIC_LAST_MODIFIED = new Date("2026-03-02T00:00:00.000Z");
const SERVICE_LAST_MODIFIED = new Date("2026-03-02T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/about-us",
    "/about-us/giving-back",
    "/service-area",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/resources"
  ];

  const areaRoutes = areas.flatMap((area) => [
    {
      url: `${SITE_URL}/areas/${area.slug}`,
      lastModified: new Date(area.updatedDate),
      changeFrequency: "monthly" as const,
      priority: 0.8
    },
    ...area.featuredServiceSlugs.map((serviceSlug) => ({
      url: `${SITE_URL}/areas/${area.slug}/${serviceSlug}`,
      lastModified: new Date(area.updatedDate),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ]);

  const resourceRoutes = resourceArticles.map((article) => ({
    url: `${SITE_URL}/resources/${article.slug}`,
    lastModified: new Date(article.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: SERVICE_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    ...areaRoutes,
    ...resourceRoutes
  ];
}
