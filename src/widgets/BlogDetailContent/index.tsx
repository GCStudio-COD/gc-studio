"use client";

import React from "react";

export interface BlogContentBlock {
    type: "heading" | "subtitle" | "paragraph" | "list" | "media";
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // Only used if type === "heading"
    text?: string;
    listType?: "ul" | "ol"; // For list
    items?: string[]; // For list
    mediaType?: "image" | "video"; // For media
    url?: string; // For media
    layout?: "full" | "half"; // For media
}

export interface BlogDetailContentProps {
    data?: any;
    details?: {
        label: string;
        value: string | string[];
    }[];
    contentBlocks?: BlogContentBlock[];
}

export default function BlogDetailContent({ data, details: directDetails, contentBlocks: directBlocks }: BlogDetailContentProps) {
    const details = directDetails || data?.details || [];
    const contentBlocks = directBlocks || data?.contentBlocks || [];

    if (contentBlocks.length === 0 && details.length === 0) return null;

    return (
        <section className="relative z-10 w-full py-16 md:py-24 border-t border-zinc-200 bg-[#f9f6f4]">
            <div className="container mx-auto px-4 md:px-8">

                {/* Main Editorial Grid */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative max-w-7xl mx-auto">
                    
                    {/* Left Sidebar: Metadata (Sticky on Desktop) */}
                    {details.length > 0 && (
                        <div className="w-full lg:w-1/4">
                            <div className="lg:sticky lg:top-32 flex flex-row lg:flex-col flex-wrap gap-8 md:gap-10 border-t lg:border-zinc-200 pt-6 lg:pt-8">
                                {details.map((detail: any, idx: number) => (
                                    <div key={idx} className="flex-1 lg:flex-none min-w-[120px]">
                                        <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 md:mb-3">
                                            {detail.label}
                                        </h3>
                                        <div className="flex flex-col gap-1">
                                            {Array.isArray(detail.value) ? (
                                                detail.value.map((item: string, i: number) => (
                                                    <span key={i} className="text-sm md:text-base font-serif text-zinc-900">
                                                        {item}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-sm md:text-base font-serif text-zinc-900">
                                                    {detail.value}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Right Column: Main Reading Content */}
                    <div className={`w-full ${details.length > 0 ? 'lg:w-3/4' : 'lg:w-full flex justify-center'}`}>
                        <div className="max-w-3xl w-full flex flex-col gap-6 md:gap-8">
                            {contentBlocks.map((block: BlogContentBlock, idx: number) => {

                                if (block.type === "heading") {
                                    const Tag = block.tag || "h2";
                                    // Map tags to styling scales
                                    let styleClass = "text-2xl md:text-3xl font-medium text-zinc-900 mt-6 md:mt-8 tracking-tight";
                                    if (Tag === "h1") styleClass = "text-3xl md:text-5xl font-medium text-zinc-900 mt-8 md:mt-12 tracking-tight";
                                    if (Tag === "h3") styleClass = "text-xl md:text-2xl font-medium text-zinc-800 mt-4 tracking-tight";
                                    if (Tag === "h4" || Tag === "h5" || Tag === "h6") styleClass = "text-lg md:text-xl font-medium text-zinc-800 mt-4";

                                    return (
                                        <Tag key={idx} className={styleClass}>
                                            {block.text}
                                        </Tag>
                                    );
                                }

                                if (block.type === "subtitle") {
                                    return (
                                        <h3 key={idx} className="text-xl md:text-2xl font-serif italic font-light text-zinc-500 mb-2">
                                            {block.text}
                                        </h3>
                                    );
                                }

                                if (block.type === "paragraph") {
                                    // Check if this is the very first block, if so, apply drop cap
                                    const isFirst = idx === 0;
                                    return (
                                        <p
                                            key={idx}
                                            className={`text-lg md:text-[21px] font-serif font-light text-zinc-700 leading-[1.8] ${isFirst ? 'first-letter:text-5xl md:first-letter:text-7xl first-letter:font-normal first-letter:text-zinc-900 first-letter:mr-2 first-letter:float-left first-letter:leading-[0.8]' : ''}`}
                                        >
                                            {block.text}
                                        </p>
                                    );
                                }

                                if (block.type === "list") {
                                    const ListTag = block.listType === "ol" ? "ol" : "ul";
                                    return (
                                        <ListTag key={idx} className={`pl-6 md:pl-8 text-lg md:text-[21px] font-serif font-light text-zinc-700 space-y-3 ${block.listType === "ol" ? 'list-decimal' : 'list-disc'} mt-2 mb-4`}>
                                            {block.items?.map((item, i) => (
                                                <li key={i} className="leading-[1.8] pl-2">{item}</li>
                                            ))}
                                        </ListTag>
                                    );
                                }

                                if (block.type === "media" && block.url) {
                                    const isGrid = block.layout === "half";
                                    return (
                                        <div key={idx} className={`w-full ${isGrid ? 'max-w-xl mx-auto' : ''} my-8 overflow-hidden rounded-xl`}>
                                            {block.mediaType === "video" ? (
                                                <video
                                                    src={block.url}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                                                />
                                            ) : (
                                                <img
                                                    src={block.url}
                                                    alt="Blog Media"
                                                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                                                />
                                            )}
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        
                            {/* Share Icons Below Content, Aligned Right */}
                            <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col items-end w-full">
                                <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-[20px]">
                                    Share this article
                                </h3>
                                <div className="flex flex-row gap-6 items-center text-zinc-500">
                                    <button
                                        onClick={() => {
                                            if (typeof window !== "undefined") {
                                                const url = encodeURIComponent(window.location.href);
                                                window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank");
                                            }
                                        }}
                                        className="hover:text-black hover:-translate-y-1 transition-all"
                                        aria-label="Share on X"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (typeof window !== "undefined") {
                                                const url = encodeURIComponent(window.location.href);
                                                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}`, "_blank");
                                            }
                                        }}
                                        className="hover:text-[#0a66c2] hover:-translate-y-1 transition-all"
                                        aria-label="Share on LinkedIn"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (typeof window !== "undefined") {
                                                const url = encodeURIComponent(window.location.href);
                                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
                                            }
                                        }}
                                        className="hover:text-[#1877f2] hover:-translate-y-1 transition-all"
                                        aria-label="Share on Facebook"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (typeof window !== "undefined") {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert("Link copied to clipboard!");
                                            }
                                        }}
                                        className="hover:text-black hover:-translate-y-1 transition-all"
                                        aria-label="Copy Link"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
