"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface ServicesSectionData {
    title: string;
    description: string;
    link?: {
        text: string;
        url: string;
    };
    services: any[];
}

export interface ServicesSectionProps {
    data?: ServicesSectionData;
    heading?: string;
    title?: string;
    description?: string;
    link_text?: string;
    link_url?: string;
    services?: any[];
}

// Helper for media URL
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

export default function ServicesSection({ data, heading, title: directTitle, description, link_text, link_url, services: directServices }: ServicesSectionProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const title = heading || directTitle || data?.title;
    const introText = description || data?.description;
    const linkText = link_text || data?.link?.text;
    const linkUrl = link_url || data?.link?.url;
    const services = directServices || data?.services || [];

    console.log(data, "aa");


    if (!services || services.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 overflow-hidden border-t border-zinc-200">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-32">

                    {/* Left Column: Title */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-3xl md:text-[42px] font-medium text-[#111] tracking-tight">
                            {title}
                        </h2>
                    </div>

                    {/* Right Column: Content */}
                    <div className="w-full md:w-2/3 flex flex-col">

                        {/* Intro Text */}
                        <div className="pb-6 md:pb-8 border-b border-zinc-200">
                            <p className="text-lg md:text-[22px] font-[300] text-zinc-700 leading-relaxed tracking-tight">
                                {introText}
                            </p>
                        </div>

                        {/* Services List Wrapper */}
                        <div
                            className="relative"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="flex flex-col">
                                {services.map((service: any, index: number) => (
                                    <div
                                        key={index}
                                        className="py-5 md:py-7 border-b border-zinc-200 flex items-center group cursor-pointer"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                    >
                                        <h3 className={`text-3xl md:text-[40px] font-[300] tracking-tight transition-all duration-300 ease-out group-hover:translate-x-3 ${hoveredIndex === index ? 'text-black font-medium' : 'text-[#222]'}`}>
                                            {service.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Image Diamond Overlay (Mouse Follower) */}
                            <div
                                className={`hidden md:flex fixed top-0 left-0 w-[260px] h-[260px] pointer-events-none z-50 transition-[opacity,transform] duration-500 ease-out`}
                                style={{
                                    opacity: hoveredIndex !== null ? 1 : 0,
                                    transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%) rotate(30deg) scale(${hoveredIndex !== null ? 1 : 0.6})`
                                }}
                            >
                                <div className="w-full h-full relative overflow-hidden shadow-2xl">
                                    {services.map((srv: any, idx: number) => {
                                        const imageUrl = getMediaUrl(srv.image);
                                        return (
                                            <div
                                                key={idx}
                                                className={`w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                {imageUrl && (
                                                    <Image
                                                        src={imageUrl}
                                                        alt={srv.name || "Service image"}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        {linkUrl && (
                            <div className="pt-8">
                                <Link
                                    href={linkUrl}
                                    className="inline-flex px-4 md:px-5 py-1.5 md:py-2 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-zinc-800 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors"
                                >
                                    {linkText}
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
