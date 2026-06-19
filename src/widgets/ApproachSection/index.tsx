import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface ApproachSectionData {
    title: string;
    intro_text: string;
    link?: {
        text: string;
        url: string;
    };
    clients: any[];
}

export interface ApproachSectionProps {
    data?: ApproachSectionData;
}

// Helper for Strapi media
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.data?.attributes?.url) {
        const url = media.data.attributes.url;
        return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }
    if (media.url) {
        return media.url.startsWith('http') ? media.url : `http://localhost:1337${media.url}`;
    }
    return '';
};

export default function ApproachSection({ data }: ApproachSectionProps) {
    const title = data?.title || "Approach";
    const introText = data?.intro_text || "Work that works. Clear, collaborative, and crafted with care.";
    const linkText = data?.link?.text || "Our approach";
    const linkUrl = data?.link?.url || "/approach";
    const clients = data?.clients || [];

    // Fallback constant for static usage
    const displayClients = clients.length > 0 ? clients : [
        { name: "Norton", style: "font-serif italic text-2xl md:text-3xl font-medium tracking-tight" },
        { name: "M", style: "font-serif italic text-4xl md:text-5xl font-light" },
        { name: "RCA", style: "font-black text-3xl md:text-4xl tracking-tighter uppercase" },
        { name: "Emirates", style: "font-serif text-xl md:text-2xl font-medium" },
        { name: "EE", style: "font-bold text-2xl md:text-3xl bg-white text-[#1a1a1a] rounded-full w-12 h-12 flex items-center justify-center" },
        { name: "TEAM sky", style: "font-bold text-lg md:text-xl tracking-tight" },
        { name: "GOV.UK", style: "font-bold text-xl md:text-2xl tracking-tight" },
        { name: "NYETIMBER", style: "font-medium text-sm md:text-base tracking-[0.2em] uppercase" },
        { name: "M&CSAATCHI", style: "font-black text-xl md:text-2xl tracking-tighter uppercase" },
        { name: "apollo", style: "font-bold text-2xl md:text-3xl italic tracking-tight lowercase" },
        { name: "LAND ROVER", style: "font-bold text-sm md:text-base tracking-widest uppercase border border-white/30 rounded-full px-4 py-2" },
        { name: "Panasonic", style: "font-bold text-xl md:text-2xl tracking-tighter" },
    ];

    return (
        <section className="w-full py-16 md:py-24 border-t border-zinc-200">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-32 mb-16 md:mb-24">
                    {/* Left Column: Title */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-3xl md:text-[42px] font-medium text-[#111] tracking-tight">
                            {title}
                        </h2>
                    </div>

                    {/* Right Column: Content */}
                    <div className="w-full md:w-2/3 flex flex-col items-start">
                        <p className="text-lg md:text-[22px] font-[300] text-zinc-700 leading-relaxed tracking-tight mb-6">
                            {introText}
                        </p>

                        {linkUrl && (
                            <Link
                                href={linkUrl}
                                className="inline-flex px-4 md:px-5 py-1.5 md:py-2 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-zinc-800 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors"
                            >
                                {linkText}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
                    {displayClients.map((client: any, index: number) => {
                        const imageUrl = getMediaUrl(client.image);
                        
                        return (
                            <div
                                key={index}
                                className="w-full aspect-square bg-[#1c1c1c] rounded-xl md:rounded-2xl flex items-center justify-center p-4 transition-transform duration-500 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                            >
                                {imageUrl ? (
                                    <Image 
                                        src={imageUrl} 
                                        alt={client.name || "Client logo"} 
                                        fill
                                        className="object-contain p-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                        unoptimized
                                    />
                                ) : (
                                    <div className={`text-white text-center transition-opacity duration-300 group-hover:opacity-70 ${client.style || 'font-bold text-xl'}`}>
                                        {client.name}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
