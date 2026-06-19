import React from 'react';
import { HomeBanner } from '@/components/Widgets/HomeBanner';
import FeaturedProjects from '@/widgets/FeaturedProjects';
import ServicesSection from '@/widgets/ServicesSection';
import ApproachSection from '@/widgets/ApproachSection';
import ArticlesSection from '@/widgets/ArticlesSection';

// Map Strapi component names to React components
const widgetMap: Record<string, React.FC<any>> = {
  // Native Strapi component names
  'widget.home-banner': HomeBanner,
  'widget.featured-projects': FeaturedProjects,
  'widget.services-section': ServicesSection,
  'widget.approach-section': ApproachSection,
  'widget.articles-section': ArticlesSection,
  
  // Custom API widget_type names
  'HomeBanner': HomeBanner,
  'FeaturedProjects': FeaturedProjects,
  'ServicesSection': ServicesSection,
  'ApproachSection': ApproachSection,
  'ArticlesSection': ArticlesSection,
};

export const WidgetRenderer = ({ widgets }: { widgets: any[] }) => {
  if (!widgets || !Array.isArray(widgets) || widgets.length === 0) {
    return null;
  }

  return (
    <>
      {widgets.map((widget, index) => {
        // The component name from Strapi is in __component
        // or if you have a middleware, it might be in widget_type
        const componentName = widget.__component || widget.widget_type;
        const Component = widgetMap[componentName];
        
        if (!Component) {
          console.warn(`No React component found for widget: ${componentName}`);
          return null;
        }

        // Pass the widget data as props
        // Strapi v4 might spread the fields directly, so we pass it as 'data'
        return <Component key={`${componentName}-${index}`} data={widget} widget_type={componentName} />;
      })}
    </>
  );
};
