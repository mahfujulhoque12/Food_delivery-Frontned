import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "@/components/provider/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M Food Shop",
  description: "This is an e commerce site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-bg-main`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
            expand={false}
          />
          {children}
        </Provider>
      </body>
    </html>
  );
}
