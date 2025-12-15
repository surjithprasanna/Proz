import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProZ - Custom Software Development",
  description: "High-quality software for Students, Startups, and Enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
        <GalaxyBackground />
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
