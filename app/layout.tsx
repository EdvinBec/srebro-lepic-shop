import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import AttentionRow from "@/components/AttentionRow";
import localFont from "@next/font/local";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Head from "next/head";
import icon from "@/public/favicon.ico";

const inter = Inter({ subsets: ["latin"] });

const Boska = localFont({
  src: [
    {
      path: "../public/fonts/Boska-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/Boska-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Boska-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Boska-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-boska",
});

export const metadata: Metadata = {
  title: "Srebro Lepić",
  description: "Sirok asortiman svih vrsta nakita.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${Boska.variable} font-boska`}>
      <link rel="icon" href="/icon.svg" sizes="any" />
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="realtive flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <AttentionRow />
            <NavigationBar />
            {children}
            <Toaster />
            <Footer className="mt-12" />
          </div>
        </main>
      </body>
    </html>
  );
}
