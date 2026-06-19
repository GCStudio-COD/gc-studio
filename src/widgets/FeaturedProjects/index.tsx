import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface FeaturedProjectsData {
    title: string;
    link?: {
        text: string;
        url: string;
    };
    featured_projects: any[]; // The Strapi relation
}

export interface FeaturedProjectsProps {
    data?: FeaturedProjectsData;
}

// Helper for Strapi media
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.data?.attributes?.url) {
        const url = media.data.attributes.url;
        return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }
    if (media.url) {
        return media.url.startsWith('http') ? media.url : `http://localhost:1337${media.url}`;
    }
    return '';
};

// Helper for category names
const getCategoryNames = (categories: any) => {
    if (!categories) return [];
    if (Array.isArray(categories)) {
        return categories.map(cat => {
            if (typeof cat === 'string') return cat;
            if (cat.name) return cat.name;
            if (cat.attributes?.name) return cat.attributes.name;
            return '';
        }).filter(Boolean);
    }
    // Strapi v4 data array wrapper
    if (categories.data && Array.isArray(categories.data)) {
        return categories.data.map((cat: any) => cat.attributes?.name || '').filter(Boolean);
    }
    return [];
};

export default function FeaturedProjects({ data }: FeaturedProjectsProps) {
    // If no data is provided (e.g. static usage on page.tsx), we fallback to empty gracefully
    const title = data?.title || "Featured projects";
    const linkText = data?.link?.text || "View all";
    const linkUrl = data?.link?.url || "/projects";
    const projects = data?.featured_projects || [];

    // Fallback constant for testing if no projects provided
    const displayProjects = projects.length > 0 ? projects : [
        {
            id: 1,
            title: "Sprint Valley",
            categories: ["Marketing & advertising", "Brand"],
            isNew: true,
            bgType: "abstract",
        },
        {
            id: 2,
            title: "NoteWorthy",
            categories: ["Travel & tourism", "Website"],
            isNew: true,
            bgType: "image",
            image: "https://images.unsplash.com/photo-1513635269975-5969336cd190?q=80&w=1000",
        }
    ];

    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-[42px] font-medium text-[#111] tracking-tight">
                        {title}
                    </h2>
                    {linkUrl && (
                        <Link 
                            href={linkUrl} 
                            className="px-3 md:px-4 py-1 md:py-1.5 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-zinc-800 text-[9px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors mt-2"
                        >
                            {linkText}
                        </Link>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {displayProjects.map((project: any, i: number) => {
                        const bgType = project.bgType || "image";
                        const imageUrl = getMediaUrl(project.image);
                        const catNames = getCategoryNames(project.categories);
                        
                        return (
                            <div key={project.id || i} className="flex flex-col group cursor-pointer">
                                {/* Card Media */}
                                <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden relative mb-4">
                                    {project.isNew && (
                                        <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-[#ff6b4a] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">
                                            New
                                        </div>
                                    )}
                                    
                                    {bgType === "abstract" || (!imageUrl) ? (
                                        <div className="w-full h-full bg-[#050505] flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                                            {/* CSS Logo Representation */}
                                            <div className="w-[180px] md:w-[240px] h-[180px] md:h-[240px] bg-[#fbf8f1] rounded-[48px] md:rounded-[64px] relative flex items-center justify-center overflow-hidden">
                                                {/* Cutouts */}
                                                <div className="absolute left-[-25px] top-1/2 -translate-y-1/2 w-[50px] h-[100px] bg-[#050505] rounded-r-full" />
                                                <div className="absolute right-[-25px] top-1/2 -translate-y-1/2 w-[50px] h-[100px] bg-[#050505] rounded-l-full" />
                                                
                                                {/* Inner dots */}
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="w-[30px] md:w-[40px] h-[70px] md:h-[90px] bg-[#050505] rounded-full transform -rotate-[25deg] translate-y-[-10px]" />
                                                    <div className="w-[70px] md:w-[90px] h-[25px] md:h-[35px] bg-[#050505] rounded-full transform -rotate-[25deg] translate-y-[20px]" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                                            <Image 
                                                src={imageUrl} 
                                                alt={project.title || "Project image"}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
                                        </div>
                                    )}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
