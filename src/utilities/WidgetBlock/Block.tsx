

import ApproachSection from "@/widgets/ApproachSection";
import ArticlesSection from "@/widgets/ArticlesSection";
import FeaturedProjects from "@/widgets/FeaturedProjects";
import HomeBanner from "@/widgets/HomeBanner";
import ServicesSection from "@/widgets/ServicesSection";
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
