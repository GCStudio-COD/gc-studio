"use client";

import React from "react";

export interface BenefitsSectionProps {
    data?: any;
    title?: string;
    description?: string;
    benefits?: string[] | { title: string, description?: string }[];
}

export default function BenefitsSection({ data, title: directTitle, description: directDesc, benefits: directBenefits }: BenefitsSectionProps) {
    const sectionTitle = directTitle || data?.title || "Why Our Approach Works";
    const sectionDescription = directDesc || data?.description || "Highlighting the core benefits of our methodology and how it translates to success.";
    
    // Normalize benefits array whether it's strings or objects
    const rawBenefits = directBenefits || data?.benefits || [];
    
    const benefits = rawBenefits.map((b: any) => {
        if (typeof b === 'string') return { title: b };
        return b;
    });

    if (!benefits || benefits.length === 0) return null;

    return (
        <section className="w-full py-20 md:py-32 bg-[#111] text-white">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-32 mb-16 md:mb-24">
                    <div className="w-full md:w-1/3">
                        <h2 className="text-4xl md:text-[56px] font-light tracking-tight leading-tight">
                            {sectionTitle}
                        </h2>
                    </div>
                    {sectionDescription && (
                        <div className="w-full md:w-2/3 flex flex-col items-start md:pt-4">
                            <p className="text-lg md:text-[22px] font-[300] text-zinc-400 leading-relaxed tracking-tight">
                                {sectionDescription}
                            </p>
                        </div>
                    )}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {benefits.map((benefit: any, index: number) => {
                        const number = (index + 1).toString().padStart(2, '0');
                        return (
                            <div 
                                key={index} 
                                className="group relative p-8 md:p-10 border border-zinc-800 bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-500 rounded-[12px] md:rounded-[20px] overflow-hidden"
                            >
                                <div className="text-zinc-600 font-medium text-sm tracking-widest mb-12 transition-colors duration-500 group-hover:text-zinc-400">
                                    {number}
                                </div>
                                <h3 className="text-2xl md:text-[28px] font-light tracking-tight text-white mb-4">
                                    {benefit.title}
                                </h3>
                                {benefit.description && (
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        {benefit.description}
                                    </p>
                                )}
                                
                                {/* Decorative line */}
                                <div className="absolute bottom-0 left-0 h-1 bg-white w-0 group-hover:w-full transition-all duration-700 ease-out opacity-20"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
