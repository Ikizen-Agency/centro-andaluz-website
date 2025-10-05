
'use client';
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

// This is a client component because it uses usePathname hook
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <title>Centro Andaluz de la Habana | Sitio Web</title>
        <meta name="description" content="Preservando y promoviendo la cultura andaluza en el corazón de La Habana. Únete a nuestros eventos, música, baile y más." />
        <meta name="keywords" content="Andalucía, La Habana, Cuba, Cultura, Flamenco, Centro Español" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {!isDashboard && <Header />}
        <main className={isDashboard ? '' : 'min-h-screen'}>
          {children}
        </main>
        {!isDashboard && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
