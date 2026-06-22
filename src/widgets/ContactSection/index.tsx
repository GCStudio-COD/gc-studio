"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface ContactSectionProps {
  data?: any;
  title?: string;
  description?: string;
  email?: string;
  offices?: {
    city: string;
    address: string;
  }[];
}

export default function ContactSection({ data, title: directTitle, description: directDesc, email: directEmail, offices: directOffices }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const title = directTitle || data?.title || "Let's start \n a project.";
  const description = directDesc || data?.description || "We're always looking for new challenges and interesting partners. Tell us about your goals.";
  const email = directEmail || data?.email || "hello@gcstudio.com";

  const offices = directOffices || data?.offices || [
    { city: "New York", address: "100 Broadway\nNew York, NY 10005" },
    { city: "London", address: "140 Old Street\nLondon, EC1V 9BW" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-zinc-950 pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column: Info & Copy */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>

              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight leading-[1.05] mb-8 whitespace-pre-line">
                {title}
              </h1>
              <p className="text-xl md:text-2xl font-light text-zinc-600 max-w-md leading-relaxed mb-12">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-8 md:gap-12 mt-12 lg:mt-32">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Email</h3>
                <a href={`mailto:${email}`} className="text-xl md:text-2xl font-medium hover:text-zinc-600 transition-colors">
                  {email}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {offices.map((office: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">{office.city}</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed whitespace-pre-line">
                      {office.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white shadow-sm border border-zinc-100 rounded-[32px] md:rounded-[48px] p-8 md:p-12 lg:p-16">
              {isSubmitted ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-8 shadow-sm">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Message Sent!</h2>
                  <p className="text-lg text-zinc-600 max-w-sm mx-auto">
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 px-8 py-4 bg-zinc-900 text-white rounded-full font-bold text-sm tracking-wide hover:bg-zinc-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
                  {/* Name & Email Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-zinc-300 py-3 text-lg md:text-xl font-medium focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-zinc-300 py-3 text-lg md:text-xl font-medium focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>



                  {/* Message Group */}
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Details</label>
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-transparent border-b border-zinc-300 py-3 text-lg md:text-xl font-medium focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-400 resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center justify-center w-full md:w-auto px-10 py-5 bg-zinc-900 text-white rounded-full overflow-hidden transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                    >
                      <span className="relative z-10 text-sm md:text-base font-bold uppercase tracking-widest flex items-center gap-3">
                        {isSubmitting ? "Sending..." : "Submit Request"}
                        {!isSubmitting && (
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
