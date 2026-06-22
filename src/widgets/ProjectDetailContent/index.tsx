"use client";

import React from "react";

export interface ProjectDetailContentProps {
    data?: any;
    headingText1?: string;
    headingText2?: string;
    description?: string[];
    details?: {
        label: string;
        value: string | string[];
    }[];
}

export default function ProjectDetailContent({ data, headingText1: directH1, headingText2: directH2, description: directDesc, details: directDetails }: ProjectDetailContentProps) {
    const headingText1 = directH1 || data?.headingText1;
    const headingText2 = directH2 || data?.headingText2;
    
    const description = directDesc || data?.description || [];

    const details = directDetails || data?.details || [];

    if (!headingText1 && !headingText2 && description.length === 0 && details.length === 0) return null;

    return (
        <section className="relative z-10 w-full py-16 md:py-24 border-t border-zinc-200 bg-[#f9f6f4]">
            <div className="container mx-auto px-4 md:px-8">
                {/* Heading Area */}
                <div className="max-w-[95%] md:max-w-[85%] mb-20 md:mb-32">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.3] md:leading-[1.15] tracking-tight text-zinc-900">
                        {headingText1 && (
                            <span className="font-medium mr-2 md:mr-3">
                                {headingText1}
                            </span>
                        )}
                        {headingText2 && (
                            <span className="font-serif italic font-light text-zinc-500">
                                {headingText2}
                            </span>
                        )}
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col lg:flex-row gap-[100px] lg:gap-[200px]">

                    {/* Left Column: Description */}
                    <div className="w-full lg:w-[55%]">
                        <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">
                            Description
                        </h3>
                        <div className="flex flex-col gap-6 md:gap-8">
                            {description.map((paragraph: string, idx: number) => (
                                <p key={idx} className="text-base md:text-[19px] font-serif font-light text-zinc-600 leading-[1.7]">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="w-full lg:w-[45%] flex flex-col md:flex-row gap-12 md:gap-16">

                        {/* What We Did Column */}
                        <div className="flex flex-col flex-1">
                            {details.filter((d: any) => d.label.toLowerCase() === "what we did").map((detail: any, idx: number) => (
                                <div key={idx} className="mb-8">
                                    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">
                                        {detail.label}
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {Array.isArray(detail.value) ? (
                                            detail.value.map((item: string, i: number) => (
                                                <span key={i} className="text-base md:text-lg font-serif text-zinc-900">
                                                    {item}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-base md:text-lg font-serif text-zinc-900">
                                                {detail.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Other Details Column */}
                        <div className="flex flex-col flex-1 gap-10 md:gap-12">
                            {details.filter((d: any) => d.label.toLowerCase() !== "what we did").map((detail: any, idx: number) => (
                                <div key={idx}>
                                    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                                        {detail.label}
                                    </h3>
                                    <div className="flex flex-col gap-1">
                                        {Array.isArray(detail.value) ? (
                                            detail.value.map((item: string, i: number) => (
                                                <span key={i} className="text-base md:text-[17px] font-serif text-zinc-700">
                                                    {item}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-base md:text-[17px] font-serif text-zinc-700">
                                                {detail.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
