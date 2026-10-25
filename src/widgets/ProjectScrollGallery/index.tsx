"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export interface ProjectScrollGalleryItem {
    id?: string | number;
    image?: string | any;
    url?: string | any;
    type?: "image" | "video";
    title?: string;
    caption?: string;
    category?: string;
}

export interface ProjectScrollGalleryProps {
    data?: any;
    tag?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    items?: ProjectScrollGalleryItem[];
    images?: (string | any)[];
    cursorText?: string;
}

// Helper to extract media URL from various API structures
const getMediaUrl = (media: any): string => {
    if (!media) return "";
    if (typeof media === "string") return media;
    if (typeof media.url === "string") return media.url;
    if (media.url?.url) return media.url.url;
    if (media.source_url) return media.source_url;
    if (media.src) return media.src;
    return "";
};

const getMediaType = (media: any, explicitType?: string): "image" | "video" => {
    if (explicitType === "video" || explicitType === "image") return explicitType;
    const url = getMediaUrl(media);
    if (url.match(/\.(mp4|webm|ogg|mov)$/i)) return "video";
    if (typeof media === "object" && media?.type) return media.type;
    return "image";
};

export default function ProjectScrollGallery({
    data,
    tag: directTag,
    title: directTitle,
    subtitle: directSubtitle,
    description: directDesc,
    items: directItems,
    images: directImages,
    cursorText: directCursorText,
}: ProjectScrollGalleryProps) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    // Extract content purely from API / props (no static fallback text)
    const tag = directTag || data?.tag || data?.eyebrow;
    const title = directTitle || data?.title || data?.heading;
    const subtitle = directSubtitle || data?.subtitle;
    const description = directDesc || data?.description;
    const cursorLabel = directCursorText || data?.cursorText || "DRAG";

    const rawList =
        directItems ||
        data?.items ||
        directImages ||
        data?.images ||
        data?.gallery ||
        data?.slides ||
        data?.media ||
        data?.photos ||
        data?.blocks;

    const items: ProjectScrollGalleryItem[] = Array.isArray(rawList)
        ? (rawList
            .map((item: any, idx: number) => {
                if (!item) return null;
                if (typeof item === "string") {
                    return { image: item };
                }
                const url = getMediaUrl(item?.image || item?.media || item?.file || item?.url || item);
                if (!url) return null;
                return {
                    id: item?.id || idx,
                    image: url,
                    type: item?.type || (url.match(/\.(mp4|webm|ogg|mov)$/i) ? "video" : "image"),
                    title: item?.title || item?.heading,
                    caption: item?.description || item?.caption || item?.text,
                    category: item?.category || item?.tag || item?.subtitle,
                };
            })
            .filter(Boolean) as ProjectScrollGalleryItem[])
        : [];

    // Return null if no items exist from API
    if (!items || items.length === 0) return null;

    const hasHeaderContent = Boolean(tag || title || subtitle || description);

    return (
        <section className="relative z-10 w-full bg-[#f9f6f4] py-16 md:py-24 overflow-hidden border-t border-zinc-200">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header Row */}
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14 ${!hasHeaderContent ? "md:justify-end" : ""}`}>
                    {/* Title & Eyebrow */}
                    {hasHeaderContent && (
                        <div className="max-w-2xl">
                            {tag && (
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 block">
                                    {tag}
                                </span>
                            )}
                            {title && (
                                <h2 className="text-3xl md:text-4xl lg:text-[46px] font-medium tracking-tight text-zinc-900 leading-[1.2]">
                                    {title}
                                    {subtitle && (
                                        <span className="font-serif italic font-light text-zinc-500 ml-2 md:ml-3">
                                            {subtitle}
                                        </span>
                                    )}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-4 text-base md:text-lg font-serif font-light text-zinc-600 leading-relaxed max-w-xl">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Navigation Controls (Arrows only - number counter removed) */}
                    <div className="flex items-center gap-2 self-end">
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slidePrev()}
                            disabled={isBeginning}
                            aria-label="Previous slide"
                            className={`w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isBeginning
                                ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                                : "border-zinc-300 text-zinc-800 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white cursor-pointer active:scale-95"
                                }`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slideNext()}
                            disabled={isEnd}
                            aria-label="Next slide"
                            className={`w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isEnd
                                ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                                : "border-zinc-300 text-zinc-800 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white cursor-pointer active:scale-95"
                                }`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full relative" data-cursor={cursorLabel}>
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        spaceBetween={16}
                        slidesPerView={1.15}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.6,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1440: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                        grabCursor={true}
                        className="py-2"
                    >
                        {items.map((item, idx) => {
                            const url = getMediaUrl(item.image);
                            const mediaType = getMediaType(item.image, item.type);
                            if (!url) return null;

                            return (
                                <SwiperSlide key={item.id || idx} className="h-auto">
                                    <div className="group flex flex-col h-full select-none cursor-grab active:cursor-grabbing" data-cursor={cursorLabel}>
                                        {/* Media Container with Viewport Scale Height */}
                                        <div className="relative w-full h-[65vh] md:h-[78vh] lg:h-[82vh] min-h-[480px] overflow-hidden rounded-[12px] md:rounded-[14px] bg-[#1a1a1a] shadow-sm">
                                            {mediaType === "video" ? (
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
                                                    alt={item.title || `Gallery Item ${idx + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                                    unoptimized
                                                />
                                            )}
                                            {/* Subtle overlay */}
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>

            {/* Swiper Slider Track */}

        </section>
    );
}
