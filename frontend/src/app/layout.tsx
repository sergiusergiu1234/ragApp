import "./globals.css";
import { Footer } from "@/components/ui/footer";
import Auth0ProviderWrapper from "@/components/Auth0ProviderWrapper";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col w-[100vw]">
        <Auth0ProviderWrapper>
          <SidebarProvider>
          <div className="flex-1 w-full">
            
            {children}
          </div>
          </SidebarProvider>
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}
