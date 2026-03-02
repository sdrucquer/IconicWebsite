import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { serviceMap, services } from "@/data/services";

type ServicePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = serviceMap[params.slug];

  if (!service) {
    return {
      title: "Service Not Found"
    };
  }

  return {
    title: `${service.name} in Pottstown, PA`,
    description: `${service.name} services for homeowners in Pottstown, PA and surrounding areas. Get a free quote from Iconic Landscaping.`
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = serviceMap[params.slug];

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate service={service} />;
}
