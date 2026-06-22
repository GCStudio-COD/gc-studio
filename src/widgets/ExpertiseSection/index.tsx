"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface ExpertiseSectionProps {
    data?: any;
    capabilities?: {
        title: string;
        description: string;
    }[];
}

export default function ExpertiseSection({ data, capabilities: directCapabilities }: ExpertiseSectionProps) {
    const capabilities = directCapabilities || data?.capabilities || data?.items || [];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const cursorRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: -1000, y: -1000 }); // start off-screen

    useEffect(() => {
        let animationFrameId: number;

        const updateCursorPosition = () => {
            // Target is exact mouse position
            const targetX = mousePos.current.x;
            const targetY = mousePos.current.y;

            // Lerp current position towards target for smooth delay
            currentPos.current.x += (targetX - currentPos.current.x) * 0.15;
            currentPos.current.y += (targetY - currentPos.current.y) * 0.15;

            // Calculate velocity/delta (the distance between current and target)
            const deltaX = targetX - currentPos.current.x;
            const deltaY = targetY - currentPos.current.y;

            if (cursorRef.current) {
                // Apply rotation and skew based on delta to create the "wave/jelly" effect
                const rotate = deltaX * 0.03;
                const skewX = deltaX * 0.04;
                const skewY = deltaY * 0.04;

                cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg)`;
            }
            animationFrameId = requestAnimationFrame(updateCursorPosition);
        };

        animationFrameId = requestAnimationFrame(updateCursorPosition);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
        // If it's the very first move, snap the currentPos to mouse immediately to avoid flying from 0,0
        if (currentPos.current.x === -1000) {
            currentPos.current.x = e.clientX;
            currentPos.current.y = e.clientY;
        }
    };

    if (!capabilities || capabilities.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 bg-[#f9f6f4] relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div
                    className="flex flex-col relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Top border for the first item */}
                    <div className="w-full h-px bg-zinc-200 mb-2"></div>

                    {capabilities.map((item: any, index: number) => {
                        const number = (index + 1).toString().padStart(2, '0');

                        return (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-16 border-b border-zinc-200 group cursor-pointer relative z-20"
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                {/* Number and Title */}
                                <div className="flex items-start gap-3 md:gap-6 md:w-1/2">
                                    <span className="text-[10px] md:text-xs font-medium text-zinc-500 mt-2 md:mt-3">
                                        {number}
                                    </span>
                                    <h2 className="text-4xl md:text-[56px] font-[300] tracking-tight text-zinc-900 group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                        {item.title}
                                    </h2>
                                </div>

                                {/* Description */}
                                <div className="md:w-1/2 mt-6 md:mt-0 flex md:justify-end">
                                    <p className="text-lg md:text-[22px] font-serif text-zinc-600 leading-relaxed md:max-w-md pointer-events-none">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {/* Floating Square Image Follower */}
                    <div
                        ref={cursorRef}
                        className="hidden md:block fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-50 will-change-transform"
                        style={{ transform: `translate3d(-1000px, -1000px, 0)` }} // Start off-screen
                    >
                        <div className={`w-full h-full relative transition-all duration-500 ease-out overflow-hidden bg-zinc-200 rounded-[10px] shadow-xl will-change-transform ${hoveredIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                            {capabilities.map((item: any, idx: number) => {
                                const imageUrl = item.image;
                                return (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-500 ease-out will-change-transform ${hoveredIndex === idx ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'}`}
                                    >
                                        {imageUrl && (
                                            <Image
                                                src={imageUrl}
                                                alt={item.title || "Capability image"}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
