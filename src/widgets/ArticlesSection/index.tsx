import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface ArticlesSectionData {
    title: string;
    link?: {
        text: string;
        url: string;
    };
    articles: any[];
}

export interface ArticlesSectionProps {
    data?: ArticlesSectionData;
    heading?: string;
    title?: string;
    link_text?: string;
    link_url?: string;
    articles?: any[];
}

// Helper for media URL
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

// Helper for Category Name
const getCategoryName = (category: any) => {
    if (!category) return "ARTICLE";
    if (typeof category === 'string') return category;
    if (category.name) return category.name;
    return "ARTICLE";
};

// Fallback background colors for articles without custom visuals
const BG_COLORS = [
    "bg-[#c198a9]", // Mauve
    "bg-[#dbff00]", // Bright yellow
    "bg-[#0096d2]", // Cyan
    "bg-[#050505]", // Black
    "bg-[#f0f0f0]", // Light grey
    "bg-[#ff6b4a]"  // Orange
];

export default function ArticlesSection({ data, heading, title: directTitle, link_text, link_url, articles: directArticles }: ArticlesSectionProps) {
    const title = heading || directTitle || data?.title;
    const sectionLinkText = link_text || data?.link?.text;
    const sectionLinkUrl = link_url || data?.link?.url;
    const articles = directArticles || data?.articles || [];

    if (!articles || articles.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 border-t border-zinc-200">
            <div className="container mx-auto px-4 md:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-[42px] font-medium text-[#111] tracking-tight">
                        {title}
                    </h2>
                    
                    {data?.link && (
                        <Link
                            href={sectionLinkUrl || "#"}
                            className="inline-flex px-4 py-1.5 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-zinc-800 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors"
                        >
                            {sectionLinkText}
                        </Link>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-6">
                    {articles.map((article: any, index: number) => {
                        // Determine if it's dynamic data from Strapi or fallback mock data
                        const isDynamic = !!article.id; 
                        
                        // Extract properties depending on if it's Strapi relation data or mock data
                        const artTitle = article.title;
                        const artExcerpt = article.description || article.excerpt;
                        const artTag = isDynamic ? getCategoryName(article.category) : article.tag;
                        const artUrl = isDynamic ? (article.slug ? `/articles/${article.slug}` : "#") : article.link?.url;
                        const linkText = "READ THE ARTICLE";
                        
                        const coverUrl = getMediaUrl(article.cover);
                        const bgClass = article.bgClass || BG_COLORS[index % BG_COLORS.length];
                        
                        const hasVisual = !!article.visual;
                        
                        return (
                            <div key={index} className="flex flex-col group cursor-pointer h-full">
                                
                                {/* Card Media */}
                                <div className={`w-full aspect-square rounded-xl overflow-hidden relative mb-6 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.02] shadow-sm ${bgClass}`}>
                                    {coverUrl ? (
                                        <Image 
                                            src={coverUrl}
                                            alt={artTitle}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : hasVisual ? (
                                        article.visual 
                                    ) : (
                                        <div className="text-4xl opacity-50">📰</div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-col flex-1">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                        {artTag}
                                    </span>
                                    
                                    <h3 className="text-xl md:text-[22px] font-medium text-zinc-900 mb-2 tracking-tight leading-tight">
                                        {artTitle}
                                    </h3>
                                    
                                    <p className="text-[15px] md:text-[16px] font-[300] text-zinc-600 leading-relaxed mb-6">
                                        {artExcerpt}
                                    </p>
                                    
                                    {artUrl && (
                                        <div className="mt-auto flex">
                                            <Link href={artUrl} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f0f0f0] group-hover:bg-[#e5e5e5] text-zinc-800 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors">
                                                {linkText}
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#111] transition-transform duration-300 group-hover:scale-150" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
