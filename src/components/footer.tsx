import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

const footerNav = [
    { label: "Inicio", href: "/" },
    { label: "Eventos", href: "/events" },
    { label: "Cultura", href: "/culture" },
    { label: "Peñas", href: "/penas"},
    { label: "Miembros", href: "/members" },
    { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-shrink-0">
                <Link href="/">
                    <Logo />
                    <span className="sr-only">Centro Andaluz de la Habana</span>
                </Link>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
                {footerNav.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                </Link>
                ))}
            </nav>
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Centro Andaluz de la Habana. Todos los derechos reservados.</p>
           <p className="mt-2">
            Hecho por <a href="https://ikizen.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">iKizen</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
