

import ApproachSection from "@/widgets/ApproachSection";
import ArticlesSection from "@/widgets/ArticlesSection";
import FeaturedProjects from "@/widgets/FeaturedProjects";
import HomeBanner from "@/widgets/HomeBanner";
import ServicesSection from "@/widgets/ServicesSection";
import ProjectBanner from "@/widgets/ProjectBanner";
import CaseStudiesSection from "@/widgets/CaseStudiesSection";
import TestimonialsSection from "@/widgets/TestimonialsSection";
import ProcessSection from "@/widgets/ProcessSection";
import FAQSection from "@/widgets/FAQSection";
import CTASection from "@/widgets/CTASection";
import ContactSection from "@/widgets/ContactSection";
import CapabilitiesListSection from "@/widgets/CapabilitiesListSection";
import ExpertiseSection from "@/widgets/ExpertiseSection";
import BenefitsSection from "@/widgets/BenefitsSection";
import ProjectDetailBanner from "@/widgets/ProjectDetailBanner";
import ProjectDetailContent from "@/widgets/ProjectDetailContent";
import ProjectImageGallery from "@/widgets/ProjectImageGallery";
import BlogDetailBanner from "@/widgets/BlogDetailBanner";
import BlogDetailContent from "@/widgets/BlogDetailContent";
import BlogSection from "@/widgets/BlogSection";
import React from "react";

interface WidgetProps {
  widget_type: string;
  [key: string]: any;
}

interface BlockProps {
  widget: WidgetProps;
}

const DefaultComponent: React.FC<any> = () => <div>Unknown Widget</div>;

const setComponent = (widget: WidgetProps): React.ComponentType<any> => {
  const components: Record<string, React.ComponentType<any>> = {
    HomeBanner: HomeBanner,
    FeaturedProjects: FeaturedProjects,
    ServicesSection: ServicesSection,
    ApproachSection: ApproachSection,
    ArticlesSection: ArticlesSection,
    BlogSection: BlogSection,
    ProjectBanner: ProjectBanner,
    ExpertiseSection: ExpertiseSection,
    CapabilitiesSection: ExpertiseSection, // Legacy support for live API
    CapabilitiesListSection: CapabilitiesListSection,
    BenefitsSection: BenefitsSection,
    ProjectDetailBanner: ProjectDetailBanner,
    ProjectDetailContent: ProjectDetailContent,
    ProjectImageGallery: ProjectImageGallery,
    BlogDetailBanner: BlogDetailBanner,
    BlogDetailContent: BlogDetailContent,
    CaseStudiesSection: CaseStudiesSection,
    TestimonialsSection: TestimonialsSection,
    ProcessSection: ProcessSection,
    FAQSection: FAQSection,
    CTASection: CTASection,
    ContactSection: ContactSection,
  };
  return components[widget.widget_type] || DefaultComponent;
};

const Block: React.FC<BlockProps> = ({ widget }) => {
  const Widget = setComponent(widget);
  return (
    <Widget
      {...widget}
    />
  );
};

export default Block;
