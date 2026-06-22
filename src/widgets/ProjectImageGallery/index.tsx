"use client";

import React from "react";
import Image from "next/image";

export interface ProjectImageGalleryProps {
    data?: any;
    blocks?: {
        layout: "full" | "half" | "third";
        images: string[];
    }[];
}

// Helper to extract media URL in case it's an object instead of string
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

const getMediaType = (media: any) => {
    if (!media) return 'image';
    if (typeof media === 'string') {
        if (media.match(/\.(mp4|webm|ogg)$/i)) return 'video';
        return 'image';
    }
    if (media.type) return media.type;
    return 'image';
};

export default function ProjectImageGallery({ data, blocks: directBlocks }: ProjectImageGalleryProps) {
    const rawBlocks = directBlocks || data?.blocks || [];

    if (!rawBlocks || rawBlocks.length === 0) return null;

    return (
        <section className="relative z-10 w-full bg-[#f9f6f4]">
            {/* The wrapper can have a standard max-width or full-width depending on preference. A slight padding looks premium. */}
            <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col gap-2 md:gap-4">
                {rawBlocks.map((block: any, idx: number) => {
                    const images = Array.isArray(block.images) ? block.images : [];

                    // Determine grid columns based on layout type
                    let gridClass = "grid-cols-1"; // full
                    if (block.layout === "half") gridClass = "grid-cols-1 md:grid-cols-2";
                    if (block.layout === "third") gridClass = "grid-cols-1 md:grid-cols-3";

                    return (
                        <div key={idx} className={`grid ${gridClass} gap-2 md:gap-4`}>
                            {images.map((img: any, imgIdx: number) => {
                                const url = getMediaUrl(img);
                                const type = getMediaType(img);
                                if (!url) return null;

                                return (
                                    <div key={imgIdx} className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[8px] md:rounded-[12px] bg-[#222]">
                                        {type === 'video' ? (
                                            <video
                                                src={url}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            />
                                        ) : (
                                            <Image
                                                src={url}
                                                alt={`Gallery Image ${idx}-${imgIdx}`}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                                                unoptimized
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
