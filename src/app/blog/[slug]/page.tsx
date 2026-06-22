import WidgetBlocks from "@/utilities/WidgetBlock";
import nextFetch from "@/utilities/nextFetch";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: any }) {
  const resolvedParams = await params;
  const data = await nextFetch(`api/blog/${resolvedParams.slug}`);

  return {
    title: data?.data?.seo?.metaTitle || "Blog Detail",
    description: data?.data?.seo?.metaDescription,
    manifest: "/manifest.json",
    icons: {
      apple: "/icon.png",
    },
    openGraph: {
      images: data?.data?.seo?.metaImage?.url?.url,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const data = await nextFetch(`api/blog/${resolvedParams.slug}`);

  if (!data?.data?.widgets && !data?.data?.project) {
    return notFound();
  }

  return (
    <WidgetBlocks widgets={data?.data?.widgets}></WidgetBlocks>
  );
}
