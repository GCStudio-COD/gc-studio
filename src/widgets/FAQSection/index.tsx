"use client";

import React, { useState } from "react";

export interface FAQSectionProps {
    data?: any;
    title?: string;
    description?: string;
    faqs?: {
        question: string;
        answer: string;
    }[];
}

export default function FAQSection({ data, title: directTitle, description: directDesc, faqs: directFaqs }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const sectionTitle = directTitle || data?.title || "Frequently Asked Questions";
    const sectionDescription = directDesc || data?.description || "Everything you need to know about our services, process, and how we work with our clients.";

    const faqs = directFaqs || data?.faqs || [
        {
            question: "What is your typical project timeline?",
            answer: "Project timelines vary depending on scope and complexity. A standard website redesign typically takes 8-12 weeks, while complex web applications can take 4-6 months. We always establish clear milestones during our initial Discovery phase."
        },
        {
            question: "Do you work with startups or established enterprises?",
            answer: "We partner with ambitious companies of all sizes. Whether you are an early-stage startup looking to define your brand identity or an enterprise needing a scalable digital platform, our process adapts to your specific goals and resources."
        },
        {
            question: "How do you handle project pricing?",
            answer: "We offer both fixed-price contracts for clearly defined scopes and time-and-materials agreements for ongoing or evolving projects. After our initial consultation, we provide a detailed proposal outlining the recommended approach and associated investment."
        },
        {
            question: "Will we have a dedicated project manager?",
            answer: "Absolutely. Every project is assigned a dedicated project manager who serves as your primary point of contact. They ensure transparent communication, manage timelines, and keep the project perfectly aligned with your business objectives."
        },
        {
            question: "Do you provide post-launch support and maintenance?",
            answer: "Yes, we believe launch is just the beginning. We offer comprehensive support, monitoring, and maintenance retainers to ensure your platform remains secure, optimized, and continuously evolving to meet your users' needs."
        }
    ];

    if (!faqs || faqs.length === 0) return null;

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-16 md:py-24 bg-white border-t border-zinc-200">
            <div className="container">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">

                    {/* Left Column: Title & Intro */}
                    <div className="md:w-1/3">
                        <div className="md:sticky md:top-32">
                            {sectionTitle && (
                                <h2 className="text-4xl md:text-[56px] font-[300] tracking-tight leading-tight text-zinc-900 mb-6">
                                    {sectionTitle}
                                </h2>
                            )}
                            {sectionDescription && (
                                <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed">
                                    {sectionDescription}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="md:w-2/3 flex flex-col">
                        <div className="border-t border-zinc-200">
                            {faqs.map((faq: any, index: number) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={index}
                                        className="border-b border-zinc-200 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleAccordion(index)}
                                            className="w-full py-8 flex justify-between items-center text-left focus:outline-none group"
                                        >
                                            <h3 className={`text-2xl md:text-3xl font-medium tracking-tight pr-8 transition-colors duration-300 ${isOpen ? 'text-zinc-900' : 'text-zinc-600 group-hover:text-zinc-900'}`}>
                                                {faq.question}
                                            </h3>

                                            {/* Icon */}
                                            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                                                <span className={`absolute w-full h-[2px] bg-zinc-900 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}></span>
                                                <span className={`absolute h-full w-[2px] bg-zinc-900 transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}></span>
                                            </div>
                                        </button>

                                        <div
                                            className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-lg md:text-xl font-serif text-zinc-600 leading-relaxed max-w-2xl">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
