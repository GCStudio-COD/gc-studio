import HomeBanner from "@/widgets/HomeBanner";
import FeaturedProjects from "@/widgets/FeaturedProjects";
import ServicesSection from "@/widgets/ServicesSection";
import ApproachSection from "@/widgets/ApproachSection";
import ArticlesSection from "@/widgets/ArticlesSection";

import WidgetBlocks from "../utilities/WidgetBlock";
import nextFetch from "../utilities/nextFetch";


export async function generateMetadata({ params }: { params: any }) {
  const data = await nextFetch(`api/general/home`);
  return {
    title: data?.data?.seo?.metaTitle,
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


export default async function Home() {
  const data = await nextFetch("api/general/home");
  console.log(data, "aa");


  return (
    <>

      {data && (
        <WidgetBlocks widgets={data?.data?.widgets}></WidgetBlocks>
      )}
    </>
    // <>
    //   <HomeBanner />
    //   <FeaturedProjects />
    //   <ServicesSection />
    //   <ApproachSection />
    //   <ArticlesSection />
    // </>
  );
}
