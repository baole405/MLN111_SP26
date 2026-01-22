import { NameInputModal } from "@/components/name-input-modal";
import { PlayerProvider } from "@/components/player-context";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import type React from "react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "vietnamese"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Phép Biện Chứng Duy Vật — Triết học Mác-Lênin",
  description:
    "Khám phá phép biện chứng duy vật - kim chỉ nam cho tư duy và hành động. Học triết học qua ví dụ đời sống và góc nhìn lập trình viên.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${sourceSans.variable} font-sans antialiased`}
      >
        <PlayerProvider>
          <NameInputModal />
          {children}
        </PlayerProvider>
        <Analytics />
      </body>
    </html>
  );
}
