import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marble CMS with shadcn Blog Template",
  description: "A simple CMS blog template built with shadcn and Marble CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {/* Theme toggle, positioned for convenience */}
          <div className="fixed top-4 right-4 z-50 flex items-center">
            <ThemeToggle />
            <Button className="rounded-full" size={"icon"} variant={"ghost"} asChild>
              <Link href="https://github.com/preetsuthar17/shadcn-marble-cms-blog-template" target="_blank">
              <Github/>
              </Link>
            </Button>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
