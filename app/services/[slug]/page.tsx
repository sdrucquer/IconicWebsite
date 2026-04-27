import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BedCleanupServicePage } from "@/components/BedCleanupServicePage";
import { BrushCleanupServicePage } from "@/components/BrushCleanupServicePage";
import { BushTrimmingServicePage } from "@/components/BushTrimmingServicePage";
import { EdgingServicePage } from "@/components/EdgingServicePage";
import { LeafCleanupServicePage } from "@/components/LeafCleanupServicePage";
import { MulchingServicePage } from "@/components/MulchingServicePage";
import { OffSiteRemovalServicePage } from "@/components/OffSiteRemovalServicePage";
import { PlantingServicePage } from "@/components/PlantingServicePage";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { SpringCleanupServicePage } from "@/components/SpringCleanupServicePage";
import { serviceDetails } from "@/data/service-details";
import { serviceMap, services } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = serviceMap[params.slug];

  if (!service) {
    return buildPageMetadata({
      title: "Service Not Found",
      description: "Requested service page was not found.",
      path: `/services/${params.slug}`,
      noIndex: true
    });
  }

  return buildPageMetadata({
    title: `${service.name} in Pottstown, PA`,
    description: `${service.name} services for homeowners in Pottstown, PA and surrounding areas. Get a free quote from Iconic Landscaping.`,
    path: `/services/${service.slug}`,
    ogImagePath: serviceDetails[service.slug].heroImage
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = serviceMap[params.slug];

  if (!service) {
    notFound();
  }

  if (service.slug === "spring-cleanup") {
    return <SpringCleanupServicePage service={service} />;
  }

  if (service.slug === "bed-cleanup") {
    return <BedCleanupServicePage service={service} />;
  }

  if (service.slug === "mulching") {
    return <MulchingServicePage service={service} />;
  }

  if (service.slug === "edging") {
    return <EdgingServicePage service={service} />;
  }

  if (service.slug === "bush-trimming") {
    return <BushTrimmingServicePage service={service} />;
  }

  if (service.slug === "off-site-removal") {
    return <OffSiteRemovalServicePage service={service} />;
  }

  if (service.slug === "planting") {
    return <PlantingServicePage service={service} />;
  }

  if (service.slug === "brush-cleanup") {
    return <BrushCleanupServicePage service={service} />;
  }

  if (service.slug === "leaf-cleanup") {
    return <LeafCleanupServicePage service={service} />;
  }

  return <ServicePageTemplate service={service} />;
}
