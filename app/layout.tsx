import type { Metadata } from "next";
import { AvatarAssetsProvider } from "./providers/avatarAssets";
import { DummyProvider } from "./providers/dummy";
import { AuthProvider } from "./providers/auth";
import { AvatarProvider } from "./providers/avatar";
import { getAssetsXML } from "./data/figuredata";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "Yu-Connect - Social Network Platform",
  description: "Connect with friends, share posts, chat in real-time, and create your avatar on Yu-Connect - a modern social networking platform built with Next.js and Supabase.",
  keywords: ["social network", "chat", "friends", "posts", "avatar", "nextjs", "supabase"],
  authors: [{ name: "CodeByCisse" }],
  icons: {
    icon: '/thumbnail.png',
  },
  openGraph: {
    title: "Yu-Connect - Social Network Platform",
    description: "Connect with friends, share posts, chat in real-time, and create your avatar on Yu-Connect.",
    siteName: "Yu-Connect",
    images: [
      {
        url: "/thumbnail.png?v=1",
        width: 1200,
        height: 630,
        alt: "Yu-Connect Social Network Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yu-Connect - Social Network Platform",
    description: "Connect with friends, share posts, chat in real-time, and create your avatar.",
    images: ["/thumbnail.png?v=1"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialAvatarData = await getAssetsXML();
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AvatarAssetsProvider assetsXML={initialAvatarData}>
          <DummyProvider>
            <AuthProvider>
              <AvatarProvider>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <main className="pt-16">
                    {children}
                  </main>
                </div>
              </AvatarProvider>
            </AuthProvider>
          </DummyProvider>
        </AvatarAssetsProvider>
      </body>
    </html>
  );
}
