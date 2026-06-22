"use client";

import React, { useState } from "react";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectBanner({ title, subtitle, projects, categories, data }: any) {
    const displayTitle = title || data?.title;
    const displaySubtitle = subtitle || data?.subtitle;

    console.log(data, "aaw");


    const displayProjects = projects || data?.projects || [];

    // Extract unique categories from projects
    const extractedCategories = Array.from(new Set(displayProjects.flatMap((proj: any) => {
        const catNames = proj.categories || [];
        if (Array.isArray(catNames) && catNames.length > 0) {
            return catNames.map((c: any) => typeof c === 'string' ? c : c?.name);
        }
        return [];
    })));

    // Safely parse categories from both the root prop and the data object
    const parseCat = (cat: any) => {
        if (!cat) return [];
        if (Array.isArray(cat)) return cat;
        if (typeof cat === 'string') return cat.split(',').map(s => s.trim());
        if (typeof cat === 'object') return Object.values(cat).map((c: any) => c?.name || c);
        return [];
    };

    const providedCategories = [...parseCat(categories), ...parseCat(data?.categories), ...parseCat(data?.category)];

    console.log("PROJECT BANNER TABS PARSED:", providedCategories);

    const mergedCategories = Array.from(new Set(["All", ...providedCategories, ...extractedCategories]));

    const finalCategories = mergedCategories.filter(c => c && c !== "undefined");

    const [activeCategory, setActiveCategory] = useState(finalCategories[0] || "All");

    if (!displayTitle && (!displayProjects || displayProjects.length === 0)) return null;

    const filteredProjects = displayProjects.filter((proj: any) => {
        if (activeCategory === "All") return true;

        const catNames = proj.categories || [];
        if (!Array.isArray(catNames) || catNames.length === 0) {
            return false;
        }

        return catNames.some((c: any) => {
            const name = typeof c === 'string' ? c : c?.name;
            return name === activeCategory;
        });
    });

    return (
        <section className="w-full pt-10 md:pt-[15%] pb-16 md:pb-32">
            <div className="container mx-auto px-4 md:px-8">
                {/* Text Content */}
                <div className="flex flex-col gap-2 md:gap-3 mb-12 md:mb-16 md:max-w-[50%]">
                    <h1 className="text-[28px] md:text-[45px] font-medium text-zinc-800 tracking-tight">
                        {displayTitle}
                    </h1>
                    <p className="text-[28px] md:text-[38px] leading-[1.15] font-light text-[#3f3f3f] tracking-tight">
                        {displaySubtitle}
                    </p>
                </div>

                {/* Tabs Area */}
                <div className="w-full">
                    {/* Tab Navigation */}
                    <div className="flex items-center gap-8 border-b border-zinc-200 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {finalCategories.map((category: any, index: number) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(category)}
                                className={`pb-4 text-base md:text-lg transition-colors font-medium whitespace-nowrap relative ${activeCategory === category ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-zinc-900" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {filteredProjects.length > 0 ? (
                        <div className="pt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {filteredProjects.map((proj: any, index: number) => (
                                <ProjectCard key={proj.id || index} project={proj} />
                            ))}
                        </div>
                    ) : (
                        <div className="pt-20 pb-12 w-full flex justify-center items-center">
                            <p className="text-xl text-zinc-500 font-medium tracking-tight">No projects available in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
