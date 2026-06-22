"use client";

import React from "react";
import { usePathname } from "next/navigation";
import FloatingNav from "../FloatingNav";
import Header from "../Header";
import Footer, { FooterData } from "../Footer";
import CustomCursor from "../CustomCursor";

import Chatbot from "../Chatbot";

interface CommonLayoutProps {
    children: React.ReactNode;
    headerData?: any;
    footerData?: FooterData;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children, headerData, footerData }) => {
    const pathname = usePathname();
    const isProjectDetail = pathname?.startsWith("/project/") && pathname !== "/project";
    const isBlogDetail = pathname?.startsWith("/blog/") && pathname !== "/blog";
    const isDetailPage = isProjectDetail || isBlogDetail;

    return (
        <>
            <CustomCursor />
            <div className="flex-1 flex flex-col relative z-10 bg-[#f9f6f4] rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-[90vh] md:mb-[80vh]">
                <Header />
                <main className={`flex-1 flex flex-col pb-24 relative z-0 ${isDetailPage ? "" : "pt-20 md:pt-24"}`}>
                    {children}
                </main>
            </div>
            <Footer data={footerData} />

            <FloatingNav data={headerData?.menu} />
            <Chatbot />
        </>
    );
};

export default CommonLayout;
