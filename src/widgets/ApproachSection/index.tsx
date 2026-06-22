import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface ApproachSectionData {
    title: string;
    description: string;
    link?: {
        text: string;
        url: string;
    };
    clients: any[];
}

export interface ApproachSectionProps {
    data?: ApproachSectionData;
    heading?: string;
    title?: string;
    description?: string;
    link_text?: string;
    link_url?: string;
    clients?: any[];
}

// Helper for media URL
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

export default function ApproachSection({ data, heading, title: directTitle, description, link_text, link_url, clients: directClients }: ApproachSectionProps) {
    const title = heading || directTitle || data?.title;
    const introText = description || data?.description;
    const linkText = link_text || data?.link?.text;
    const linkUrl = link_url || data?.link?.url;
    const clients = directClients || data?.clients || [];



    if (!clients || clients.length === 0) return null;

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
                    {clients.map((client: any, index: number) => {
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
