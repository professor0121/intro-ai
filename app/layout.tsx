import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { siteDescription, siteTitle } from "@/utils/site.info";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        cz-shortcut-listen="true"
        className={`${monaSans.className} antialiased pattern `}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
