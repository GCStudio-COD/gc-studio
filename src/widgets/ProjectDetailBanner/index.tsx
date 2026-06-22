"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

export interface ProjectDetailBannerProps {
    data?: any;
    title?: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
}

// Helper to determine media type if not explicitly provided
const getMediaType = (url: string, explicitType?: "image" | "video") => {
    if (explicitType) return explicitType;
    if (!url) return "image";
    
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const isVideo = videoExtensions.some(ext => url.toLowerCase().includes(ext));
    return isVideo ? "video" : "image";
};

// Helper for media URL
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

export default function ProjectDetailBanner({ data, title: directTitle, mediaUrl: directMediaUrl, mediaType: directMediaType }: ProjectDetailBannerProps) {
    const title = directTitle || data?.title;
    const rawMediaUrl = directMediaUrl || data?.mediaUrl || data?.bgImage || data?.videoUrl;

    if (!title && !rawMediaUrl) return null;
    
    const mediaUrl = getMediaUrl(rawMediaUrl);
    const mediaType = getMediaType(mediaUrl, directMediaType || data?.mediaType);
    
    const videoRef = useRef<HTMLVideoElement>(null);

    // Ensure video plays seamlessly
    useEffect(() => {
        if (mediaType === "video" && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
        }
    }, [mediaType]);

    return (
        <section className="sticky top-0 w-full h-[100vh] min-h-[100vh] overflow-hidden bg-black flex items-end justify-start pb-16 md:pb-24 -z-10">
            {/* Media Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                {mediaUrl && (
                    mediaType === "video" ? (
                        <video
                            ref={videoRef}
                            src={mediaUrl}
                            className="object-cover w-full h-full opacity-90"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <>
                            <Image 
                                src={mediaUrl}
                                alt={title || "Project Banner"}
                                fill
                                className="object-cover opacity-80 scale-105 animate-[slowZoom_20s_ease-out_forwards]"
                                priority
                                unoptimized
                            />
                            <style dangerouslySetInnerHTML={{__html: `
                                @keyframes slowZoom {
                                    0% { transform: scale(1.0); }
                                    100% { transform: scale(1.05); }
                                }
                            `}} />
                            {/* Gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
                        </>
                    )
                )}
            </div>

            {/* Content (Only render title if mediaType is 'image') */}
            {mediaType === "image" && title && (
                <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col items-start justify-end text-left w-full">
                    <h1 className="text-4xl md:text-6xl lg:text-[80px] font-medium tracking-tight text-white leading-tight drop-shadow-2xl max-w-6xl">
                        {title}
                    </h1>
                </div>
            )}
        </section>
    );
}
