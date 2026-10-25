"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    // Handle Escape key and lock body scroll when modal is active
    useEffect(() => {
        if (!isModalOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setIsLoading(true);
        try {
            // Simulated asynchronous subscription
            await new Promise((res) => setTimeout(res, 800));
            setIsSubmitted(true);
        } catch (err) {
            console.error("Subscription error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="fixed bottom-0 left-0 w-full h-[80vh] md:h-[70vh] z-0 bg-[#1a1a1a] text-white flex flex-col justify-end pb-8">
            <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-between pt-16 md:pt-24 relative">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-full pb-16 md:pb-8">

                    {/* Left Column */}
                    <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-12 z-10">
                        <Link href={`tel:${ctaUrl}`} className="w-max flex items-center gap-3 bg-[#2a2a2a] hover:bg-[#333] transition-colors rounded-full px-5 py-3 border border-white/5">
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
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-lg md:text-xl font-[300] text-zinc-300 hover:text-white transition-colors text-left flex items-center gap-2 group cursor-pointer"
                                >
                                    <span>{newsletterText}</span>
                                    <svg className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
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
                    <div className="text-xs md:text-sm font-medium uppercase tracking-wider text-zinc-400">
                        {copyrightText}
                    </div>
                </div>

            </div>

            {/* Newsletter Subscription Modal */}
            {mounted && isModalOpen && typeof document !== "undefined"
                ? createPortal(
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsModalOpen(false);
                        }}
                    >
                        <div className="relative w-full max-w-lg bg-[#181818] border border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col text-left">
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close modal"
                                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {/* Modal Body */}
                            {!isSubmitted ? (
                                <>
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#00a884] mb-3 block">
                                        Newsletter Subscription
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mb-3">
                                        Stay Inspired.
                                    </h3>
                                    <p className="text-sm md:text-base font-serif font-light text-zinc-400 leading-relaxed mb-6">
                                        Receive our monthly digest of design thinking, brand strategy, and curated studio insights delivered straight to your inbox.
                                    </p>

                                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                        <div className="relative w-full">
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/10 text-sm md:text-base transition-all"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <span className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                                            ) : (
                                                <>
                                                    <span>Subscribe to Newsletter</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <p className="text-[11px] text-zinc-500 mt-4 text-center">
                                        No spam, ever. You can unsubscribe at any time.
                                    </p>
                                </>
                            ) : (
                                <div className="py-6 flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-[#00a884]/10 border border-[#00a884]/30 flex items-center justify-center text-[#00a884] mb-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                                        You&apos;re Subscribed!
                                    </h3>
                                    <p className="text-sm md:text-base font-serif font-light text-zinc-400 max-w-sm mb-6 leading-relaxed">
                                        Thank you for subscribing to our monthly inspirations. Keep an eye on your inbox for our next edition.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setIsSubmitted(false);
                                            setEmail("");
                                        }}
                                        className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm cursor-pointer"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )
                : null}
        </footer>
    );
}
