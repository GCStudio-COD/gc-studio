import React from "react";
import CaseStudyCard from "@/components/CaseStudyCard";

export interface CaseStudiesSectionProps {
    data?: any;
    title?: string;
    description?: string;
    caseStudies?: any[];
}

export default function CaseStudiesSection({ data, title: directTitle, description: directDesc, caseStudies: directCaseStudies }: CaseStudiesSectionProps) {
    const sectionTitle = directTitle || data?.title || "Impact";
    const sectionDescription = directDesc || data?.description || data?.subtitle || "A selection of our recent work and the results we've achieved.";
    console.log(data, "aaqa");

    const caseStudies = directCaseStudies || data?.caseStudies || [];

    if (!caseStudies || caseStudies.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 bg-[#f9f6f4]">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header Area */}
                {(sectionTitle || sectionDescription) && (
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-32 mb-16 md:mb-24">
                        {/* Left Column: Title */}
                        <div className="w-full md:w-1/3">
                            {sectionTitle && (
                                <h2 className="text-3xl md:text-[42px] font-medium text-[#111] tracking-tight">
                                    {sectionTitle}
                                </h2>
                            )}
                        </div>

                        {/* Right Column: Content */}
                        <div className="w-full md:w-2/3 flex flex-col items-start">
                            {sectionDescription && (
                                <p className="text-lg md:text-[22px] font-[300] text-zinc-700 leading-relaxed tracking-tight mb-6">
                                    {sectionDescription}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                    {caseStudies.map((study: any, index: number) => (
                        <CaseStudyCard
                            key={index}
                            image={study.image}
                            category={study.category}
                            title={study.title}
                            description={study.description}
                            buttonText={study.buttonText}
                            buttonUrl={study.buttonUrl}
                            link={study.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
