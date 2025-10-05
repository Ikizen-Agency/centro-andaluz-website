import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex-shrink-0">
                <Link href="/">
                    <Logo />
                    <span className="sr-only">Centro Andaluz de la Habana</span>
                </Link>
            </div>
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
