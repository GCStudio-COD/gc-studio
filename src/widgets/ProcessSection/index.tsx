import React from "react";

export interface ProcessSectionProps {
    data?: any;
    title?: string;
    description?: string;
    processes?: {
        title: string;
        description: string;
        includes: string[];
    }[];
}

export default function ProcessSection({ data, title: directTitle, description: directDesc, processes: directProcesses }: ProcessSectionProps) {
    const sectionTitle = directTitle || data?.title || "Our Process";
    const sectionDescription = directDesc || data?.description || "A proven methodology that transforms ambitious ideas into exceptional digital experiences.";
    
    const processes = directProcesses || data?.processes || [];

    if (!processes || processes.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-32 bg-white text-zinc-900 relative border-b border-zinc-200">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">
                    
                    {/* Sticky Left Sidebar */}
                    <div className="md:w-1/3 relative">
                        <div className="md:sticky md:top-32">
                            {(sectionTitle || sectionDescription) && (
                                <div className="flex flex-col gap-6">
                                    {sectionTitle && (
                                        <h2 className="text-4xl md:text-[64px] font-[300] tracking-tight leading-tight">
                                            {sectionTitle}
                                        </h2>
                                    )}
                                    {sectionDescription && (
                                        <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed max-w-sm">
                                            {sectionDescription}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Process Cards */}
                    <div className="md:w-2/3 flex flex-col gap-6 md:gap-8">
                        {processes.map((step: any, index: number) => {
                            const number = (index + 1).toString().padStart(2, '0');
                            
                            return (
                                <div 
                                    key={index} 
                                    className="relative bg-[#f9f6f4] rounded-3xl p-8 md:p-12 border border-zinc-200 overflow-hidden group hover:bg-white hover:shadow-xl transition-all duration-500"
                                >
                                    {/* Large background number watermark */}
                                    <div className="absolute -right-8 -bottom-12 text-[180px] md:text-[240px] font-bold text-zinc-200/60 leading-none select-none pointer-events-none group-hover:text-zinc-200 transition-colors duration-500">
                                        {number}
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8">
                                            <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                                                {number}
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                                                {step.title}
                                            </h3>
                                        </div>
                                        
                                        <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed mb-10 max-w-2xl">
                                            {step.description}
                                        </p>
                                        
                                        <div>
                                            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">
                                                Includes
                                            </h4>
                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                {step.includes.map((item: string, idx: number) => (
                                                    <span 
                                                        key={idx} 
                                                        className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs md:text-sm font-medium text-zinc-600 shadow-sm"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
