import React from "react";
import Image from "next/image";

export interface BlogDetailBannerProps {
    data?: any;
    title?: string;
    subtitle?: string;
    mediaUrl?: string;
    mediaType?: string;
}

const getMediaUrl = (media: any) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.url) return media.url;
    return '';
};

const getMediaType = (media: any, forceType?: string) => {
    if (forceType) return forceType;
    if (!media) return 'image';
    
    let url = '';
    if (typeof media === 'string') url = media;
    else if (media.url) url = media.url;
    
    if (url.match(/\.(mp4|webm|ogg)$/i) || media.mime?.startsWith('video/')) {
        return 'video';
    }
    return 'image';
};

export default function BlogDetailBanner({ data, title: directTitle, subtitle: directSubtitle, mediaUrl: directMediaUrl, mediaType: directMediaType }: BlogDetailBannerProps) {
    const title = directTitle || data?.title;
    const subtitle = directSubtitle || data?.subtitle;
    const rawMediaUrl = directMediaUrl || data?.mediaUrl || data?.bgImage || data?.videoUrl || data?.video;
    
    const mediaUrl = getMediaUrl(rawMediaUrl);
    const mediaType = getMediaType(rawMediaUrl, directMediaType || data?.mediaType);

    if (!title && !mediaUrl) return null;

    return (
        <section className="w-full pt-20 md:pt-[15%] pb-12">
            <div className="container mx-auto px-4 md:px-8">
                {/* Text Content */}
                <div className="flex flex-col gap-2 md:gap-3 mb-12 md:mb-16 max-w-[80%] md:max-w-[50%]">
                    <h1 className="text-[28px] md:text-[45px] font-medium text-zinc-800 tracking-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-[20px] md:text-[38px] leading-[1.15] font-light text-[#3f3f3f] tracking-tight mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Hero Graphic Area */}
                <div className="w-full aspect-square sm:aspect-video md:aspect-[2.2/1] bg-[#e0e0e0] rounded-[10px] relative overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full relative overflow-hidden">
                        {mediaUrl && mediaType === 'video' ? (
                            <video
                                src={mediaUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : mediaUrl ? (
                            <Image 
                                src={mediaUrl}
                                alt={title || "Blog Banner"}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
