import "./globals.css";
import { Footer } from "@/components/ui/footer";
import Auth0ProviderWrapper from "@/components/Auth0ProviderWrapper";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import LoginHeader from "@/components/ui/LoginHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      
      <body className="min-h-screen flex flex-col w-[100vw] ">
        <Auth0ProviderWrapper>
          
          <SidebarProvider>
            {/* Header bar for login/logout button */}
            
            
              
           
            <div className="flex-1 w-full">
              <div className="fixed top-0 right-0 w-fit flex justify-end items-center p-4 z-50 bg-white/80 backdrop-blur">
              <LoginHeader />
              </div>
            {children}
            </div>
          </SidebarProvider>
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}
