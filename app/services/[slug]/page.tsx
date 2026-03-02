import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
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

  return <ServicePageTemplate service={service} />;
}
