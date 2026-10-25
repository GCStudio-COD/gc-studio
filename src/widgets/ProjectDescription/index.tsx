"use client";

import React from "react";

export interface ProjectDescriptionListItem {
    title?: string;
    text?: string;
    description?: string;
}

export type ProjectDescriptionItem = string | ProjectDescriptionListItem;

export interface ProjectDescriptionProps {
    data?: any;
    tag?: string;
    title?: string;
    subtitle?: string;
    description?: string | string[];
    listTitle?: string;
    list?: ProjectDescriptionItem[];
    layout?: "split" | "stacked";
    bgClass?: string;
}

// Fallback preview data for development
const defaultSample = {
    tag: "The Approach",
    title: "Defining clarity in a complex landscape",
    subtitle: "Strategy grounded in human behavior.",
    description: [
        "Every project begins with uncovering the underlying truths of the brand and its audience. Rather than applying surface-level treatments, we look for fundamental tensions that can be resolved through thoughtful design.",
        "Through systematic design sprints, close client collaboration, and rapid prototyping, we arrived at an identity that feels both effortless and deeply intentional across all consumer touchpoints."
    ],
    listTitle: "Key Deliverables & Outcomes",
    list: [
        "Comprehensive brand architecture and guidelines covering digital and physical touchpoints",
        "Bespoke typographic hierarchy and custom headline lettering system",
        "Design tokens, responsive UI components, and accessible design system",
        "Interactive prototypes and motion choreography for product launch"
    ]
};

export default function ProjectDescription({
    data,
    tag: directTag,
    title: directTitle,
    subtitle: directSubtitle,
    description: directDesc,
    listTitle: directListTitle,
    list: directList,
    layout: directLayout,
    bgClass: directBgClass,
}: ProjectDescriptionProps) {
    // Extract properties from direct props or data wrapper
    const tag = directTag || data?.tag || data?.eyebrow;
    const title = directTitle || data?.title || data?.heading;
    const subtitle = directSubtitle || data?.subtitle;

    const rawDescription = directDesc ?? data?.description ?? data?.content;
    const rawList = directList ?? data?.list ?? data?.listItems ?? data?.items ?? data?.bullets;
    const listTitle = directListTitle || data?.listTitle || data?.list_title;
    const layout = directLayout || data?.layout || "split";
    const bgClass = directBgClass || data?.bgClass || "bg-[#f9f6f4]";

    // Normalize description into array of strings or HTML string
    let paragraphs: string[] = [];
    let isHtmlDescription = false;
    let htmlContent = "";

    if (Array.isArray(rawDescription)) {
        paragraphs = rawDescription.filter(Boolean);
    } else if (typeof rawDescription === "string" && rawDescription.trim().length > 0) {
        if (/<(p|br|div|ul|li|h[1-6])[\s>]/i.test(rawDescription)) {
            isHtmlDescription = true;
            htmlContent = rawDescription;
        } else {
            paragraphs = rawDescription
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean);
        }
    }

    // Normalize list items
    const listItems: { title?: string; text: string }[] = [];
    if (Array.isArray(rawList)) {
        rawList.forEach((item) => {
            if (typeof item === "string" && item.trim()) {
                listItems.push({ text: item.trim() });
            } else if (item && typeof item === "object") {
                const text = item.text || item.description || item.value || "";
                if (text || item.title) {
                    listItems.push({
                        title: item.title,
                        text: text,
                    });
                }
            }
        });
    }

    // Check if there is any content to render
    const hasAnyContent = Boolean(
        tag ||
        title ||
        subtitle ||
        paragraphs.length > 0 ||
        isHtmlDescription ||
        listItems.length > 0
    );

    // If completely empty in dev mode, show sample data for easy testing
    if (!hasAnyContent) {
        if (process.env.NODE_ENV === "development") {
            return (
                <ProjectDescription
                    tag={defaultSample.tag}
                    title={defaultSample.title}
                    subtitle={defaultSample.subtitle}
                    description={defaultSample.description}
                    listTitle={defaultSample.listTitle}
                    list={defaultSample.list}
                    layout={layout}
                />
            );
        }
        return null;
    }

    const isSplit = layout === "split";

    return (
        <section className={`relative z-10 w-full py-16 md:py-24 border-t border-zinc-200 ${bgClass}`}>
            <div className="container mx-auto px-4 md:px-8">
                {isSplit ? (
                    /* Split Layout: Two Columns (Left: Heading/Tag, Right: Description & List) */
                    <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-24">
                        {/* Left Column: Heading & Tag */}
                        {(tag || title || subtitle) && (
                            <div className="w-full lg:w-[42%] flex flex-col items-start lg:sticky lg:top-28 self-start">
                                {tag && (
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 md:mb-6 block">
                                        {tag}
                                    </span>
                                )}
                                {(title || subtitle) && (
                                    <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] leading-[1.2] md:leading-[1.15] tracking-tight text-zinc-900 font-medium">
                                        {title}
                                        {subtitle && (
                                            <span className="block font-serif italic font-light text-zinc-500 mt-2 text-2xl sm:text-3xl md:text-4xl">
                                                {subtitle}
                                            </span>
                                        )}
                                    </h2>
                                )}
                            </div>
                        )}

                        {/* Right Column: Paragraphs & Bullet List */}
                        <div className={`w-full ${tag || title || subtitle ? "lg:w-[58%]" : "w-full max-w-4xl"} flex flex-col gap-10 md:gap-12`}>
                            {/* Description Paragraphs */}
                            {isHtmlDescription ? (
                                <div
                                    className="font-serif font-light text-zinc-600 text-base md:text-[20px] leading-[1.7] space-y-6 [&_a]:underline [&_strong]:font-semibold [&_strong]:text-zinc-900"
                                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                                />
                            ) : (
                                paragraphs.length > 0 && (
                                    <div className="flex flex-col gap-6 md:gap-8">
                                        {paragraphs.map((paragraph, idx) => (
                                            <p
                                                key={idx}
                                                className="text-base md:text-[20px] font-serif font-light text-zinc-600 leading-[1.7]"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                )
                            )}

                            {/* Conditional Bullet List (ul/li) */}
                            {listItems.length > 0 && (
                                <div className="pt-2 md:pt-4 border-t border-zinc-200/80">
                                    {listTitle && (
                                        <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 md:mb-8">
                                            {listTitle}
                                        </h3>
                                    )}
                                    <ul className="flex flex-col gap-4 md:gap-5">
                                        {listItems.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3.5 md:gap-4 group">
                                                {/* Bullet Icon */}
                                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zinc-400 mt-2.5 flex-shrink-0 group-hover:bg-zinc-900 transition-colors" />
                                                <div className="text-base md:text-[18px] font-serif font-light text-zinc-700 leading-relaxed">
                                                    {item.title && (
                                                        <strong className="font-sans font-medium text-zinc-900 mr-2 text-[15px] md:text-[17px]">
                                                            {item.title}:
                                                        </strong>
                                                    )}
                                                    <span>{item.text}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Stacked Layout: Title on top, followed by Description and Bullet List */
                    <div className="max-w-4xl mx-auto flex flex-col gap-10 md:gap-14">
                        {/* Heading Area */}
                        {(tag || title || subtitle) && (
                            <div className="flex flex-col items-start border-b border-zinc-200/80 pb-8 md:pb-12 w-full">
                                {tag && (
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 block">
                                        {tag}
                                    </span>
                                )}
                                {(title || subtitle) && (
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.2] md:leading-[1.15] tracking-tight text-zinc-900 font-medium">
                                        {title}
                                        {subtitle && (
                                            <span className="block font-serif italic font-light text-zinc-500 mt-2 text-2xl sm:text-3xl md:text-4xl">
                                                {subtitle}
                                            </span>
                                        )}
                                    </h2>
                                )}
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="flex flex-col gap-10 md:gap-12">
                            {/* Description Paragraphs */}
                            {isHtmlDescription ? (
                                <div
                                    className="font-serif font-light text-zinc-600 text-base md:text-[20px] leading-[1.7] space-y-6 [&_a]:underline [&_strong]:font-semibold [&_strong]:text-zinc-900"
                                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                                />
                            ) : (
                                paragraphs.length > 0 && (
                                    <div className="flex flex-col gap-6 md:gap-8">
                                        {paragraphs.map((paragraph, idx) => (
                                            <p
                                                key={idx}
                                                className="text-base md:text-[20px] font-serif font-light text-zinc-600 leading-[1.7]"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                )
                            )}

                            {/* Conditional Bullet List (ul/li) */}
                            {listItems.length > 0 && (
                                <div className="pt-4 border-t border-zinc-200/80">
                                    {listTitle && (
                                        <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 md:mb-8">
                                            {listTitle}
                                        </h3>
                                    )}
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                                        {listItems.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3.5 md:gap-4 group">
                                                {/* Bullet Icon */}
                                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zinc-400 mt-2.5 flex-shrink-0 group-hover:bg-zinc-900 transition-colors" />
                                                <div className="text-base md:text-[18px] font-serif font-light text-zinc-700 leading-relaxed">
                                                    {item.title && (
                                                        <strong className="font-sans font-medium text-zinc-900 mr-2 text-[15px] md:text-[17px]">
                                                            {item.title}:
                                                        </strong>
                                                    )}
                                                    <span>{item.text}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
