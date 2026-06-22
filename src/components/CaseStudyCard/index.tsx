import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CaseStudyCardProps {
    image: string;
    category: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
    link?: string;
}

export default function CaseStudyCard({ image, category, title, description, buttonText, buttonUrl, link }: CaseStudyCardProps) {
    return (
        <Link href={link || buttonUrl || "#"} className="flex flex-col w-full group cursor-pointer" data-cursor="VIEW">
            {/* Image Container */}
            <div className="w-full aspect-square rounded-[10px] overflow-hidden relative mb-6">
                <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-[1.03] bg-zinc-200">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col px-1">
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-2 md:mb-3">
                    {category}
                </span>

                <h3 className="text-4xl md:text-[50px] font-[300] tracking-tight text-zinc-900 mb-4 md:mb-5 leading-none">
                    {title}
                </h3>

                <p className="text-base md:text-lg font-serif text-zinc-600 leading-relaxed mb-6 md:mb-8 md:min-h-[100px]">
                    {description}
                </p>

                {buttonText && (
                    <div>
                        <span
                            className="inline-flex px-4 md:px-5 py-2 bg-zinc-200/60 hover:bg-zinc-200 text-zinc-800 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors"
                        >
                            {buttonText}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}
