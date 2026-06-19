import Block from "./Block";

import React from "react";

interface WidgetItem {
  id: string | number;
  widget_type: string;
  [key: string]: any;
}

interface WidgetBlocksProps {
  widgets?: WidgetItem[];
}

const WidgetBlocks: React.FC<WidgetBlocksProps> = ({ widgets = [] }) => {
  const child = widgets.map((widget, index) => (
    <Block
      key={widget.id || `${widget.widget_type}-${index}`}
      widget={widget}
    />
  ));

  return <>{child}</>;
};

export default WidgetBlocks;
