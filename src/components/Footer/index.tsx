import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface FooterData {
    ctaLink?: {
        text: string;
        url: string;
    };
    emailAddress?: string;
    socialLinks?: Array<{
        text: string;
        url: string;
    }>;
    newsletterText?: string;
    copyrightText?: string;
    graphic?: any;
}

export interface FooterProps {
    data?: FooterData;
}

// Helper for media URL
const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

export default function Footer({ data }: FooterProps) {
    const ctaText = data?.ctaLink?.text || "Schedule a call";
    const ctaUrl = data?.ctaLink?.url || "#";
    const emailAddress = data?.emailAddress || "hi@ohmy.studio";
    const newsletterText = data?.newsletterText || "Monthly inspiration and news";
    const copyrightText = data?.copyrightText || "OHMY © 2014-2024";
    const graphicUrl = getMediaUrl(data?.graphic) || "/1705356027-footer.svg";

    const socialLinks = data?.socialLinks?.length ? data.socialLinks : [
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
        { text: "Behance", url: "#" }
    ];

    return (
        <footer className="fixed bottom-0 left-0 w-full h-[80vh] md:h-[70vh] z-0 bg-[#1a1a1a] text-white flex flex-col justify-end pb-8">
            <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-between pt-16 md:pt-24 relative">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-full pb-16 md:pb-8">

                    {/* Left Column */}
                    <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-12 z-10">
                        <Link href={ctaUrl} className="w-max flex items-center gap-3 bg-[#2a2a2a] hover:bg-[#333] transition-colors rounded-full px-5 py-3 border border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00a884]"></span>
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5e5e5]">{ctaText}</span>
                        </Link>

                        <div className="flex flex-col gap-6 md:gap-8">
                            <div>
                                <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5">Enquiries</h4>
                                <a href={`mailto:${emailAddress}`} className="text-lg md:text-xl font-[300] text-zinc-300 hover:text-white transition-colors">{emailAddress}</a>
                            </div>

                            <div>
                                <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5">Social</h4>
                                <div className="flex flex-wrap gap-4 md:gap-5 text-lg md:text-xl font-[300] text-zinc-300">
                                    {socialLinks.map((social, idx) => (
                                        <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                            {social.text}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5">Newsletter</h4>
                                <p className="text-lg md:text-xl font-[300] text-zinc-300">{newsletterText}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Graphic) */}
                    <div className="hidden md:flex w-full md:w-1/2 justify-end items-end h-full relative z-0">
                        {graphicUrl ? (
                            <div className="relative w-full h-full max-w-[550px]">
                                <Image src={graphicUrl} alt="Footer graphic" fill className="object-contain object-bottom" unoptimized />
                            </div>
                        ) : (
                            <svg viewBox="0 0 600 400" className="w-full h-full max-w-[700px] object-contain" xmlns="http://www.w3.org/2000/svg">
                                {/* Abstract Minimalist Representation of the Graphic */}
                                <g stroke="#ffffff" strokeWidth="3" fill="#fcfcfc" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M 150 150 C 130 180 130 250 150 300 M 150 150 C 170 180 170 250 150 300" fill="none" />
                                    <circle cx="150" cy="110" r="20" fill="none" />
                                    <path d="M 300 120 C 280 160 280 230 300 300 M 300 120 C 320 160 320 230 300 300" fill="none" />
                                    <circle cx="300" cy="80" r="20" fill="none" />
                                    <path d="M 450 100 C 430 140 430 210 450 300 M 450 100 C 470 140 470 210 450 300" fill="none" />
                                    <circle cx="450" cy="60" r="20" fill="none" />
                                    <rect x="180" y="160" width="100" height="100" />
                                    <circle cx="400" cy="220" r="60" />
                                    <path d="M 160 170 L 190 200" fill="none" />
                                    <path d="M 290 150 L 250 190" fill="none" />
                                    <path d="M 310 140 L 350 190" fill="none" />
                                    <path d="M 440 130 L 400 190" fill="none" />
                                </g>
                            </svg>
                        )}
                    </div>

                </div>

                {/* Footer Bottom Bar */}
                <div className="flex justify-between items-center pt-8 z-10 w-full mb-20 md:mb-8">
                    <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                        {copyrightText}
                    </div>
                </div>

            </div>
        </footer>
    );
}
