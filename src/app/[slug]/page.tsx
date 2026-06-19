import { notFound } from 'next/navigation';
import { WidgetRenderer } from '@/components/WidgetRenderer';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

async function getPageData(slug: string) {
  try {
    // Fetch the page by slug and populate the widgets dynamic zone and seo component
    const res = await fetch(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&populate[widgets][populate]=*&populate[seo][populate]=*`,
      { 
        next: { revalidate: 10 },
      }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch page data: ${res.statusText}`);
    }

    const data = await res.json();
    return data?.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPageData(params.slug);
  if (!page) return {};

  const seo = page.attributes?.seo || page.seo;
  if (!seo) return { title: page.attributes?.title || page.title };

  return {
    title: seo.metaTitle || page.attributes?.title || page.title,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: seo.metaRobots,
    viewport: seo.metaViewport,
    alternates: seo.canonicalURL ? { canonical: seo.canonicalURL } : undefined,
    openGraph: seo.metaImage?.data?.attributes?.url ? {
      images: [
        {
          url: `${STRAPI_URL}${seo.metaImage.data.attributes.url}`,
          width: seo.metaImage.data.attributes.width,
          height: seo.metaImage.data.attributes.height,
          alt: seo.metaImage.data.attributes.alternativeText || 'SEO Image',
        }
      ]
    } : undefined
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPageData(params.slug);

  if (!page) {
    notFound();
  }

  // Handle both default Strapi v4 format (attributes) and flattened format
  const widgets = page.attributes?.widgets || page.widgets || [];

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between">
      <WidgetRenderer widgets={widgets} />
    </main>
  );
}
