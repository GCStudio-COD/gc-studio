import React from "react";

export default function HomeBanner({ title, subtitle, video, poster, data }: any) {
    const displayTitle = title || data?.title;
    const displaySubtitle = subtitle || data?.subtitle;
    const displayVideo = video || data?.video;

    if (!displayTitle && !displayVideo) return null;

    return (
        <section className="w-full pt-10 md:pt-[15%] pb-12">
            <div className="container mx-auto">
                {/* Text Content */}
                <div className="flex flex-col gap-2 md:gap-3 mb-12 md:mb-16 max-w-[50%]">
                    <h1 className="text-[28px] md:text-[45px] font-medium text-zinc-800 tracking-tight">
                        {displayTitle}
                    </h1>
                    <p className="text-[28px] md:text-[38px] leading-[1.15] font-light text-[#3f3f3f] tracking-tight">
                        {displaySubtitle}
                    </p>
                </div>

                {/* Hero Graphic Area */}
                <div className="w-full aspect-square sm:aspect-video md:aspect-[2.2/1] bg-[#c3e6ff] rounded-2xl sm:rounded-[32px] relative overflow-hidden flex items-center justify-center">
                    {/* Video Container */}
                    <div className="w-full h-full bg-[#404040] rounded-xl sm:rounded-2xl shadow-2xl relative overflow-hidden">
                        <video
                            src={displayVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
