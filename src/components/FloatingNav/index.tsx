"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingNav({ data }: { data?: any[] }) {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement | null>(null);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const [isHoveringNav, setIsHoveringNav] = useState(false);

    if (!data || data.length === 0) return null;

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = navRef.current?.getBoundingClientRect();
        if (!rect || !circleRef.current) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        circleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (!isHoveringNav) setIsHoveringNav(true);
    };

    const handleMouseLeave = () => {
        setIsHoveringNav(false);
    };

    return (
        <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw] pointer-events-auto">
            <nav
                ref={navRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-cursor="nav"
                className="relative flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-full bg-[rgba(30,30,30,0.4)] backdrop-blur-[10px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-visible"
            >
                {/* Enlarged Cursor Circle: Rendered on z-[1] behind the z-10 text */}
                <div
                    ref={circleRef}
                    className={`absolute top-0 left-0 pointer-events-none rounded-full bg-black/60 shadow-md transition-opacity duration-200 z-[1] w-[50px] h-[50px] ${
                        isHoveringNav ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
                    }}
                />

                {data.map((item: any, i: number) => {
                    const name = item.title || item.label || item.name || "Link";
                    let href = item.slug || item.url || item.href || item.link || "#";
                    if (!href.startsWith('/') && !href.startsWith('http') && !href.startsWith('#')) {
                        href = `/${href}`;
                    }

                    const isHome = name.toLowerCase() === "home";
                    const icon = isHome ? (
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[18px]">
                            <path
                                d="M10.5625 15.8749V11.7499C10.5625 11.5675 10.4901 11.3927 10.3611 11.2637C10.2322 11.1348 10.0573 11.0624 9.875 11.0624H7.125C6.94266 11.0624 6.7678 11.1348 6.63886 11.2637C6.50993 11.3927 6.4375 11.5675 6.4375 11.7499V15.8749C6.4375 16.0572 6.36507 16.2321 6.23614 16.361C6.1072 16.4899 5.93234 16.5624 5.75 16.5624H1.625C1.44266 16.5624 1.2678 16.4899 1.13886 16.361C1.00993 16.2321 0.9375 16.0572 0.9375 15.8749V7.92566C0.939039 7.83052 0.959601 7.73664 0.997974 7.64956C1.03635 7.56248 1.09176 7.48397 1.16094 7.41863L8.03594 1.17097C8.16268 1.05503 8.32823 0.990723 8.5 0.990723C8.67177 0.990723 8.83732 1.05503 8.96406 1.17097L15.8391 7.41863C15.9082 7.48397 15.9637 7.56248 16.002 7.64956C16.0404 7.73664 16.061 7.83052 16.0625 7.92566V15.8749C16.0625 16.0572 15.9901 16.2321 15.8611 16.361C15.7322 16.4899 15.5573 16.5624 15.375 16.5624H11.25C11.0677 16.5624 10.8928 16.4899 10.7639 16.361C10.6349 16.2321 10.5625 16.0572 10.5625 15.8749Z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : null;

                    const isActive = href === "/"
                        ? pathname === href
                        : pathname?.startsWith(href);

                    return (
                        <Link
                            key={i}
                            href={href}
                            data-cursor="nav"
                            className={`group relative z-10 flex items-center justify-center px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-sm font-medium tracking-wide uppercase transition-colors duration-300 whitespace-nowrap text-white`}
                        >
                            {/* Active Background Indicator */}
                            <span
                                className={`absolute inset-0 rounded-full -z-10 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive
                                        ? "bg-white/15 scale-100 opacity-100"
                                        : "opacity-0"
                                    }`}
                            />

                            <span className="relative z-10 flex items-center">
                                {icon ? icon : name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
