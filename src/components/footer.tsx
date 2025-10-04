import Link from "next/link";
import { Logo } from "@/components/logo";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "./ui/button";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

const footerLinks = [
    { title: "Explore", links: [
        { label: "Home", href: "/" },
        { label: "Events", href: "/events" },
        { label: "Community", href: "/members" },
        { label: "Blog", href: "/blog" },
    ]},
    { title: "About", links: [
        { label: "Our Mission", href: "/#about" },
        { label: "Contact Us", href: "#" },
    ]},
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Preserving and promoting the vibrant spirit of Andalusian culture in the heart of Havana.
            </p>
          </div>
          
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

          <div>
             <h4 className="font-headline font-semibold mb-4">Connect</h4>
             <div className="flex space-x-2">
                {socialLinks.map((social) => (
                    <Button key={social.name} variant="ghost" size="icon" asChild>
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                            <social.icon className="h-5 w-5" />
                            <span className="sr-only">{social.name}</span>
                        </a>
                    </Button>
                ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Centro Andaluz de la Habana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
