import React from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

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
    heading?: string;
    title?: string;
    link_text?: string;
    link_url?: string;
    projects?: any[];
    featured_projects?: any[];
}

export default function FeaturedProjects({ data, heading, title: directTitle, link_text, link_url, projects: directProjects, featured_projects }: FeaturedProjectsProps) {
    const title = heading || directTitle || data?.title;
    const linkText = link_text || data?.link?.text;
    const linkUrl = link_url || data?.link?.url;
    const projects = directProjects || featured_projects || data?.featured_projects || [];

    if (!projects || projects.length === 0) return null;

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
                    {projects.map((project: any, i: number) => (
                        <ProjectCard key={project.id || i} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
