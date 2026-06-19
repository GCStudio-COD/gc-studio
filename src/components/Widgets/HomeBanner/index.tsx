import React from 'react';

export interface HomeBannerData {
  title: string;
  description: string;
  featured_video: {
    poster: any;
    video: any;
  };
}

export interface HomeBannerProps {
  widget_type: 'HomeBanner';
  data: HomeBannerData;
}

// Helper to extract URL from Strapi media field
const getMediaUrl = (media: any) => {
  if (!media) return '';
  if (typeof media === 'string') return media;
  // Try default Strapi v4 format first
  if (media.data?.attributes?.url) {
    const url = media.data.attributes.url;
    return url.startsWith('http') ? url : `http://localhost:1337${url}`;
  }
  // Try flattened format
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `http://localhost:1337${media.url}`;
  }
  return '';
};

export const HomeBanner: React.FC<HomeBannerProps> = ({ data }) => {
  const videoUrl = getMediaUrl(data?.featured_video?.video);
  const posterUrl = getMediaUrl(data?.featured_video?.poster);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video or Poster */}
      <div className="absolute inset-0 w-full h-full">
        {videoUrl ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={posterUrl}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : posterUrl ? (
          <img 
            src={posterUrl} 
            alt={data.title || 'Banner'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Text Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6">
        {data.title && (
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
            {data.title}
          </h1>
        )}
        {data.description && (
          <p className="text-lg md:text-2xl text-gray-100 max-w-3xl drop-shadow-md">
            {data.description}
          </p>
        )}
      </div>
    </section>
  );
};

export default HomeBanner;
