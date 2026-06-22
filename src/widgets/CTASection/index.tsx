import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface CTASectionProps {
    data?: any;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
    bgImage?: string;
}

export default function CTASection({ data, title: directTitle, description: directDesc, buttonText: directButtonText, buttonUrl: directButtonUrl, bgImage: directBgImage }: CTASectionProps) {
    const title = directTitle || data?.title;
    const description = directDesc || data?.description || data?.subtitle;
    const buttonText = directButtonText || data?.buttonText;
    const buttonUrl = directButtonUrl || data?.buttonUrl;
    const bgImage = directBgImage || data?.bgImage;

    if (!title && !buttonText && !bgImage) return null;

    return (
        <section className="w-full py-8 md:py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="relative w-full rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col items-center justify-center text-center py-16 md:py-24">
                    
                    {/* Background Image */}
                    {bgImage && (
                        <div className="absolute inset-0 w-full h-full">
                            <Image 
                                src={bgImage} 
                                alt="CTA Background" 
                                fill
                                className="object-cover"
                                quality={90}
                                unoptimized
                            />
                            {/* Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center px-4 max-w-4xl">
                        {title && (
                            <h2 className="text-3xl md:text-5xl lg:text-[64px] font-medium tracking-tight text-white leading-[1.1] mb-4 md:mb-6">
                                {title}
                            </h2>
                        )}
                        
                        {description && (
                            <p className="text-base md:text-xl font-light text-zinc-200 max-w-2xl leading-relaxed mb-8 md:mb-10">
                                {description}
                            </p>
                        )}
                        
                        {buttonText && (
                            <Link 
                                href={buttonUrl || "#"}
                                className="group relative inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-4 bg-white text-zinc-950 rounded-full overflow-hidden transition-all hover:scale-105 shadow-2xl"
                            >
                                <span className="relative z-10 text-sm md:text-base font-bold uppercase tracking-widest transition-colors group-hover:text-white">
                                    {buttonText}
                                </span>
                                <div className="absolute inset-0 h-full w-full bg-zinc-900 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
