import type { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { penas } from '@/lib/penas';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peñas Culturales | Centro Andaluz de la Habana',
  description: 'Nuestras reuniones mensuales para celebrar la cultura andaluza: flamenco, literatura, gastronomía y más.',
};

export default function PenasPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Peñas Culturales</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestros encuentros mensuales: un espacio para compartir y vivir la pasión por la cultura andaluza en el corazón de La Habana.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {penas.map((pena) => (
                    <AccordionItem key={pena.id} value={pena.id} className="border-b-0">
                       <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                         <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <div className="flex items-center w-full">
                                <pena.icon className="h-8 w-8 mr-4 text-primary flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold !font-headline">{pena.title}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{pena.day}</span>
                                    </div>
                                </div>
                            </div>
                         </AccordionTrigger>
                         <AccordionContent>
                           <div className="px-6 pb-6">
                            <div className="border-t pt-4">
                                <p className="text-muted-foreground mb-4">{pena.description}</p>
                                <p className="text-foreground/80">{pena.longDescription}</p>
                            </div>
                           </div>
                         </AccordionContent>
                       </Card>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

      </div>
    </div>
  );
}
