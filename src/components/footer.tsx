import Link from "next/link";
import { Logo } from "@/components/logo";

const footerLinks = [
    { title: "Explorar", links: [
        { label: "Inicio", href: "/" },
        { label: "Eventos", href: "/events" },
        { label: "Peñas", href: "/penas"},
        { label: "Blog", href: "/blog" },
    ]},
    { title: "Sobre Nosotros", links: [
        { label: "Nuestra Misión", href: "/#about" },
        { label: "Miembros", href: "/members" },
        { label: "Contáctanos", href: "#" },
    ]},
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Preservando y promoviendo el espíritu vibrante de la cultura andaluza en el corazón de La Habana.
            </p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            {footerLinks.map((section) => (
                <div key={section.title}>
                <h4 className="font-headline font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                    {section.links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Centro Andaluz de la Habana. Todos los derechos reservados.</p>
          <p className="mt-2">
            Made by <a href="https://ikizen.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">iKizen</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
