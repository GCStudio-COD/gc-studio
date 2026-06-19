import HomeBanner from "@/widgets/HomeBanner";
import FeaturedProjects from "@/widgets/FeaturedProjects";
import ServicesSection from "@/widgets/ServicesSection";
import ApproachSection from "@/widgets/ApproachSection";
import ArticlesSection from "@/widgets/ArticlesSection";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <FeaturedProjects />
      <ServicesSection />
      <ApproachSection />
      <ArticlesSection />
    </>
  );
}
