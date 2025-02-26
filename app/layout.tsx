import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { Navbar } from "@/app/_components/marketing/navbar";
import { Footer } from "@/app/_components/marketing/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Slack Clone - Modern Team Communication",
    template: "%s | Slack Clone",
  },
  description: "A powerful, feature-rich team communication platform built with Next.js",
  keywords: ["Slack Clone", "Team Communication", "Chat", "Collaboration", "Next.js"],
  authors: [
    {
      name: "Your Name",
      url: "https://yourwebsite.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
        >
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ToastProvider />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
