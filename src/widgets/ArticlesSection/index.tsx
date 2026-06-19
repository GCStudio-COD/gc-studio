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

// Helper for Category Name
const getCategoryName = (category: any) => {
    if (!category) return "ARTICLE";
    if (typeof category === 'string') return category;
    if (category.name) return category.name;
    if (category.attributes?.name) return category.attributes.name;
    if (category.data?.attributes?.name) return category.data.attributes.name;
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

export default function ArticlesSection({ data }: ArticlesSectionProps) {
    const title = data?.title || "Articles";
    const sectionLinkText = data?.link?.text || "View all articles";
    const sectionLinkUrl = data?.link?.url || "/articles";
    const articles = data?.articles || [];

    // Fallback constant for static usage
    const displayArticles = articles.length > 0 ? articles : [
        {
            tag: "ARTICLE",
            title: "Using AI in design",
            excerpt: "When and how to integrate AI into design projects",
            link: { text: "READ THE ARTICLE", url: "#" },
            bgClass: "bg-[#c198a9]",
            visual: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
                    <path d="M9 11V8a2 2 0 0 1 4 0v4" />
                    <path d="M13 11V6a2 2 0 0 1 4 0v5" />
                    <path d="M17 11V9a2 2 0 0 1 4 0v7a8 8 0 0 1-16 0v-3a2 2 0 0 1 4 0v2" />
                    <path d="M13 2v2M9 4l1 2M17 4l-1 2" />
                </svg>
            )
        },
        {
            tag: "COMING SOON",
            title: "RCA featured in Design Week",
            excerpt: "Our new work for RCA Records has been featured on the recently re-released Design Week",
            link: { text: "READ THE ARTICLE", url: "#" },
            bgClass: "bg-[#dbff00]",
            visual: (
                <div className="w-[85%] h-[120%] bg-[#111] rounded-[40px] transform rotate-[20deg] translate-y-16 flex flex-col items-start justify-start pt-12 px-6 shadow-2xl">
                     <h3 className="text-[#f0f0f0] font-black text-[32px] uppercase tracking-tighter leading-[0.85] transform -rotate-[8deg]">
                        ARTISTS<br/>ABOUT<br/>JOBS
                     </h3>
                     <div className="flex flex-wrap gap-1.5 mt-6 transform -rotate-[8deg]">
                         <span className="text-[#dbff00] border border-[#dbff00]/60 rounded-md px-1.5 py-0.5 text-[8px] font-bold">X</span>
                         <span className="text-[#dbff00] border border-[#dbff00]/60 rounded-md px-1.5 py-0.5 text-[8px] font-bold">TIKTOK</span>
                     </div>
                </div>
            )
        }
    ];

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
                            href={sectionLinkUrl}
                            className="inline-flex px-4 py-1.5 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-zinc-800 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors"
                        >
                            {sectionLinkText}
                        </Link>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-6">
                    {displayArticles.map((article: any, index: number) => {
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
