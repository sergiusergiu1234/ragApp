import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/footer";
import Auth0ProviderWrapper from "@/components/Auth0ProviderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Auth0ProviderWrapper>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}
