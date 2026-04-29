import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticleExperience } from "@/components/ResourceArticleExperience";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { resourceArticles, resourceMap, resourceSlugs } from "@/data/resources";
import { SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

type ResourcePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return resourceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ResourcePageProps): Metadata {
  const article = resourceMap[params.slug];

  if (!article) {
    return buildPageMetadata({
      title: "Resource not found",
      description: "Requested resource page was not found.",
      path: `/resources/${params.slug}`,
      noIndex: true
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/resources/${article.slug}`,
    ogImagePath: article.heroImage
  });
}

export default function ResourceArticlePage({ params }: ResourcePageProps) {
  const article = resourceMap[params.slug];

  if (!article) {
    notFound();
  }

  const relatedArticles = resourceArticles.filter((resourceArticle) => resourceArticle.slug !== article.slug).slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      name: article.author,
      url: `${SITE_URL}/about-us`
    },
    publisher: {
      "@type": "Organization",
      name: "Iconic Landscaping",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/iconic-logo-mark-optimized.png`
      }
    },
    datePublished: article.publishDate,
    dateModified: article.updatedDate,
    image: `${SITE_URL}${article.heroImage}`,
    mainEntityOfPage: `${SITE_URL}/resources/${article.slug}`
  };

  return (
    <>
      <SchemaMarkup
        type="breadcrumbList"
        payload={{
          items: [
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path: `/resources/${article.slug}` }
          ]
        }}
      />
      <SchemaMarkup
        type="faqPage"
        payload={{
          items: article.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <ResourceArticleExperience article={article} relatedArticles={relatedArticles} />
    </>
  );
}
