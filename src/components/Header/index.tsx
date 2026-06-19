"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface HeaderData {
    logoText?: string;
    logoImage?: any;
    timezones?: Array<{
        name: string;
        tz: string;
        prefix: string;
    }>;
}

export interface HeaderProps {
    data?: HeaderData;
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

export default function Header({ data }: HeaderProps) {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [zoneIndex, setZoneIndex] = useState(0);

    const logoText = data?.logoText || "GC.";
    const logoImageUrl = getMediaUrl(data?.logoImage);
    const zones = data?.timezones?.length ? data.timezones : [
        { name: "New Zealand", tz: "Pacific/Auckland", prefix: "NZST" },
        { name: "India", tz: "Asia/Kolkata", prefix: "IST" }
    ];

    useEffect(() => {
        // Set initial time
        setCurrentTime(new Date());

        // Update time every second
        const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

        // Cycle timezones every 4 seconds
        const zoneInterval = setInterval(() => {
            setZoneIndex((prev) => (prev + 1) % zones.length);
        }, 4000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(zoneInterval);
        };
    }, [zones.length]);

    const formatTime = (tz: string, prefix: string) => {
        if (!currentTime) return `${prefix} --:--:--`;
        try {
            const formatter = new Intl.DateTimeFormat("en-NZ", {
                timeZone: tz,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });
            return `${prefix} ${formatter.format(currentTime)}`;
        } catch (e) {
            // Fallback if timezone is invalid
            return `${prefix} 00:00:00`;
        }
    };

    return (
        <header className="w-full h-20 md:h-20 absolute top-0 left-0 z-50">
            {/* Container wrapper */}
            <div className="container mx-auto h-full relative z-10">
                <div className="flex items-center justify-between h-full px-4 md:px-8">
                    {/* Left side: Logo */}
                    <div className="flex items-center">
                        {logoImageUrl ? (
                            <div className="relative h-10 w-32">
                                <Image src={logoImageUrl} alt={logoText} fill className="object-contain object-left" unoptimized />
                            </div>
                        ) : (
                            <span className="text-4xl md:text-5xl font-extrabold tracking-tighter text-black select-none">
                                {logoText}
                            </span>
                        )}
                    </div>

                    {/* Right side: Location & Time (Animated) */}
                    {zones.length > 0 && (
                        <div className="relative flex items-center justify-end w-[240px] md:w-[280px] h-12 overflow-hidden">
                            {zones.map((zone, idx) => (
                                <div
                                    key={`${zone.name}-${idx}`}
                                    className={`absolute right-0 flex items-center gap-3 md:gap-4 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${zoneIndex === idx
                                            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                            : "opacity-0 translate-y-2 scale-[0.95] pointer-events-none"
                                        }`}
                                >
                                    <span className="text-[9px] md:text-[11px] font-bold tracking-[0.15em] md:tracking-[0.2em] text-[#111] uppercase whitespace-nowrap">
                                        {zone.name}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                                    <span className="text-[9px] md:text-[11px] font-bold tracking-[0.15em] md:tracking-[0.2em] text-[#111] uppercase whitespace-nowrap">
                                        {formatTime(zone.tz, zone.prefix)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
