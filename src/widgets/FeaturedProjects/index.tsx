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

import nextFetch from "@/utilities/nextFetch";

export default async function FeaturedProjects({ data, heading, title: directTitle, link_text, link_url, projects: directProjects, featured_projects }: FeaturedProjectsProps) {
    const title = heading || directTitle || data?.title;
    const linkText = link_text || data?.link?.text;
    const linkUrl = link_url || data?.link?.url;
    const initialProjects = directProjects || featured_projects || data?.featured_projects || [];

    if (!initialProjects || initialProjects.length === 0) return null;

    // Workaround: If the API doesn't provide an image but gives a link, fetch it from the project's own API endpoint
    const projects = await Promise.all(initialProjects.map(async (project: any) => {
        if (!project.image && project.link) {
            try {
                const slug = project.link.replace(/^\//, '');
                const projectData = await nextFetch(`api/project/${slug}`);
                if (projectData?.data?.widgets) {
                    const bannerWidget = projectData.data.widgets.find((w: any) => w.widget_type === 'ProjectDetailBanner');
                    if (bannerWidget?.data?.mediaUrl) {
                        return { ...project, image: bannerWidget.data.mediaUrl };
                    }
                }
            } catch (err) {
                console.error("Failed to fetch image for project:", project.link);
            }
        }
        return project;
    }));

    console.log(projects, "qqq");


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
