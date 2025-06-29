
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Auth0Provider, useUser } from "@auth0/nextjs-auth0";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        
      >
        <Auth0Provider>
        
        {children}
        </Auth0Provider>
      </body>
    </html>
  );
}
