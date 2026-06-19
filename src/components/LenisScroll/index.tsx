"use client";

import { ReactLenis } from "lenis/react";

interface LenisScrollProps {
  children: React.ReactNode;
}

const LenisScroll: React.FC<LenisScrollProps> = ({ children }) => {
  const options = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical" as const,
    gestureDirection: "vertical" as const,
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  };

  return (
    <ReactLenis
      root
      options={options}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisScroll;
