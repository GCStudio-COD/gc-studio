import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "../styles/main.scss";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

import CommonLayout from "@/components/CommonLayout";
import LenisScroll from "@/components/LenisScroll";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

async function getGlobalData() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch(`${STRAPI_URL}/api/header?populate=timezones,logoImage`, { next: { revalidate: 10 } }),
      fetch(`${STRAPI_URL}/api/footer?populate=ctaLink,socialLinks,graphic`, { next: { revalidate: 10 } })
    ]);
    
    const headerData = headerRes.ok ? await headerRes.json() : null;
    const footerData = footerRes.ok ? await footerRes.json() : null;
    
    return {
      header: headerData?.data?.attributes || headerData?.data || null,
      footer: footerData?.data?.attributes || footerData?.data || null,
    };
  } catch (err) {
    console.error("Error fetching global data", err);
    return { header: null, footer: null };
  }
}

export const metadata: Metadata = {
  title: "OHMY Studio",
  description: "Design studio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();

  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-black font-sans bg-[#1a1a1a]">

        <LenisScroll>
          <CommonLayout headerData={globalData.header} footerData={globalData.footer}>
            {children}
          </CommonLayout>
        </LenisScroll>

      </body>
    </html>
  );
}
