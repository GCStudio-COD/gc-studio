import React from 'react';

export interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
    company: string;
}

export default function TestimonialCard({ quote, name, role, company }: TestimonialCardProps) {
    return (
        <div className="bg-white p-8 md:p-12 rounded-[10px] shadow-sm border border-zinc-100 flex flex-col justify-between h-full min-h-[320px] max-w-sm md:max-w-md w-full">
            <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl md:text-[22px] font-serif text-zinc-800 leading-relaxed">
                    "{quote}"
                </p>
            </div>
            
            <div className="flex flex-col">
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">{name}</h4>
                <p className="text-xs font-medium text-zinc-500 mt-2">{role}{company ? `, ${company}` : ''}</p>
            </div>
        </div>
    );
}
