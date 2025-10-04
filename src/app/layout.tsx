
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
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Centro Andaluz de la Habana | Website</title>
        <meta name="description" content="Preserving and promoting Andalusian culture in the heart of Havana. Join us for events, music, dance, and more." />
        <meta name="keywords" content="Andalusia, Havana, Cuba, Culture, Flamenco, Spanish Center" />
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
