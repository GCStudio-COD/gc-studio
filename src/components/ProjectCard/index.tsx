"use client";
import React, { useState } from "react";
import Image from "next/image";

// Helper for media URL
export const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

// Helper for category names
export const getCategoryNames = (categories: any) => {
    if (!categories) return [];
    if (Array.isArray(categories)) {
        return categories.map((cat: any) => {
            if (typeof cat === 'string') return cat;
            if (cat.name) return cat.name;
            return '';
        }).filter(Boolean);
    }
    return [];
};

export interface ProjectCardProps {
    project: any;
}

import Link from "next/link";

export default function ProjectCard({ project }: ProjectCardProps) {
    const imageUrl = getMediaUrl(project?.image);
    const catNames = getCategoryNames(project?.categories);
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link href={project?.link || "#"} className="flex flex-col group cursor-pointer relative">
            {/* Card Media */}
            <div 
                className="w-full aspect-[3/2] lg:aspect-[4/3] rounded-[10px] overflow-hidden relative mb-4"
                data-cursor="VIEW"
            >
                {project.isNew && (
                    <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-[#ff6b4a] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">
                        New
                    </div>
                )}

                <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-[1.03] bg-zinc-200 overflow-hidden">
                    <Image
                        src={imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
                        alt={project.title || "Project image"}
                        fill
                        className={`object-cover transition-all duration-1000 ease-in-out ${isLoaded ? 'blur-0 scale-100' : 'blur-2xl scale-110'}`}
                        onLoad={() => setIsLoaded(true)}
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />
                </div>
            </div>

            {/* Card Footer */}
            <div className="grid grid-cols-2 gap-4 px-2 mt-2">
                <h3 className="text-[17px] md:text-[20px] font-medium text-zinc-900">
                    {project.title}
                </h3>
                <div className="flex flex-col font-serif">
                    <span className="text-[15px] md:text-[16px] text-zinc-700 leading-tight mb-1">{catNames[0] || ""}</span>
                    <span className="text-[15px] md:text-[16px] text-zinc-400 leading-tight">{catNames[1] || ""}</span>
                </div>
            </div>
        </Link>
    );
}
