"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import TestimonialCard from "@/components/TestimonialCard";

export interface TestimonialsSectionProps {
    data?: any;
    title?: string;
    description?: string;
    testimonials?: any[];
}

export default function TestimonialsSection({ data, title: directTitle, description: directDesc, testimonials: directTestimonials }: TestimonialsSectionProps) {
    const sectionTitle = directTitle || data?.title || "What Our Clients Say";
    const sectionDescription = directDesc || data?.description || "Hear from the people we've partnered with to create digital experiences that matter.";
    
    const testimonials = directTestimonials || data?.testimonials || [
        {
            quote: "Their attention to detail and design sensibility completely transformed our digital presence. They didn't just build a website, they elevated our entire brand.",
            name: "Sarah Jenkins",
            role: "Chief Marketing Officer",
            company: "Yapily"
        },
        {
            quote: "A rare mix of strategic thinking and flawless execution. They understood our business goals and translated them into an experience our users love.",
            name: "David Chen",
            role: "Product Director",
            company: "Echo"
        },
        {
            quote: "Working with them felt like an extension of our own team. They are responsive, creative, and incredibly talented at what they do.",
            name: "Elena Rodriguez",
            role: "CEO",
            company: "PayRay"
        },
        {
            quote: "The new platform has completely streamlined our sales funnel. The results have been immediate and incredibly impactful for our bottom line.",
            name: "Marcus Thorne",
            role: "Head of Growth",
            company: "Nova Systems"
        }
    ];

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 bg-[#f9f6f4] overflow-hidden">
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
            </div>

            {/* Autoflowing Swiper Marquee */}
            <div className="w-full relative">
                <style dangerouslySetInnerHTML={{__html: `
                    .testimonial-swiper .swiper-wrapper {
                        transition-timing-function: linear !important;
                        align-items: stretch;
                    }
                    .testimonial-swiper .swiper-slide {
                        height: auto;
                    }
                `}} />
                
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView="auto"
                    loop={true}
                    speed={8000}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    className="testimonial-swiper !px-4 md:!px-8"
                >
                    {/* Render original array + a duplicate array to ensure seamless infinite looping when there are few items */}
                    {[...testimonials, ...testimonials].map((testi: any, index: number) => (
                        <SwiperSlide key={index} className="!w-[300px] md:!w-[420px]">
                            <TestimonialCard 
                                quote={testi.quote}
                                name={testi.name}
                                role={testi.role}
                                company={testi.company}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
