
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "../styles/main.scss";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

import CommonLayout from "@/components/CommonLayout";
import LenisScroll from "@/components/LenisScroll";
import nextFetch from "../utilities/nextFetch";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await nextFetch("api/global/settings");
  const globalData = response?.data || response || {};

  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-black font-sans bg-[#1a1a1a]">

        <LenisScroll>
          <CommonLayout headerData={globalData?.header} footerData={globalData?.footer}>
            {children}
          </CommonLayout>
        </LenisScroll>

      </body>
    </html>
  );
}
