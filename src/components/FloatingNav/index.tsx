"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { 
        name: "Home", 
        href: "/",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
        )
    },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Approach", href: "/approach" },
    { name: "Contact", href: "/contact" }
];

export default function FloatingNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw] pointer-events-auto">
            <nav className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {NAV_ITEMS.map((item) => {
                    const isActive = item.href === "/" 
                        ? pathname === item.href 
                        : pathname?.startsWith(item.href);
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group relative flex items-center justify-center px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-sm font-medium tracking-wide transition-colors duration-300 whitespace-nowrap text-black`}
                        >
                            {/* Hover/Active Background Indicator */}
                            <span 
                                className={`absolute inset-0 rounded-full -z-10 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                                    isActive 
                                    ? "bg-black/[0.06] scale-100 opacity-100" 
                                    : "bg-black/[0.03] scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                                }`}
                            />
                            
                            <span className="relative z-10 flex items-center">
                                {item.icon ? item.icon : item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
