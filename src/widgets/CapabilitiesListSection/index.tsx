"use client";

import React from "react";

export default function CapabilitiesListSection({ title, capabilities, data, items }: any) {
    const sectionTitle = title || data?.title || "Capabilities";
    const listItems = capabilities || items || data?.capabilities || data?.items || [];

    if (!listItems || listItems.length === 0) return null;

    return (
        <section className="w-full py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                    {/* Left Column - Heading */}
                    <div className="md:w-1/3 shrink-0">
                        <h2 className="text-4xl md:text-[56px] font-light tracking-tight text-zinc-900 md:sticky md:top-32">
                            {sectionTitle}
                        </h2>
                    </div>

                    {/* Right Column - Grid of capabilities */}
                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
                        {listItems.map((item: any, index: number) => {
                            const text = typeof item === 'string' ? item : (item.title || item.name || '');
                            return (
                                <div 
                                    key={index} 
                                    className="group py-5 border-b border-zinc-100 flex items-center justify-between cursor-default transition-colors duration-300 hover:border-zinc-300"
                                >
                                    <span className="text-lg md:text-xl font-light text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300">
                                        {text}
                                    </span>
                                    <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-900">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
