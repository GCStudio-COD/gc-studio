import React from "react";
import FloatingNav from "../FloatingNav";
import Header from "../Header";
import Footer, { FooterData } from "../Footer";

interface CommonLayoutProps {
    children: React.ReactNode;
    headerData?: any;
    footerData?: FooterData;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children, headerData, footerData }) => {
    return (
        <>
            <div className="flex-1 flex flex-col relative z-10 bg-[#f9f6f4] rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-[80vh] md:mb-[70vh]">
                <Header />
                <main className="flex-1 flex flex-col pt-20 md:pt-24 pb-24 relative z-0">
                    {children}
                </main>
            </div>
            <Footer data={footerData} />

            <FloatingNav data={headerData?.menu} />
        </>
    );
};

export default CommonLayout;
