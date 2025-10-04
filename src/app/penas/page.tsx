import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { penas } from '@/lib/penas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peñas Culturales | Centro Andaluz de la Habana',
  description: 'Nuestras reuniones mensuales para celebrar la cultura andaluza: flamenco, literatura, gastronomía y más.',
};

export default function PenasPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Peñas Culturales</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Nuestros encuentros mensuales: un espacio para compartir y vivir la pasión por la cultura andaluza en el corazón de La Habana. Sigue nuestro recorrido cronológico a lo largo del mes.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

          <div className="space-y-16">
            {penas.map((pena, index) => {
              const isEven = index % 2 === 0;
              const penaImage = PlaceHolderImages.find(p => p.id === pena.image);
              return (
                <div key={pena.id} className="relative grid md:grid-cols-2 gap-8 items-center">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-4 border-background hidden md:block" />

                  <div className={`relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    {penaImage && (
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={penaImage.imageUrl}
                          alt={penaImage.description}
                          fill
                          className="object-cover"
                          data-ai-hint={penaImage.imageHint}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className={`text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                     <Card className="bg-card/80 backdrop-blur-sm border-0 md:border">
                        <CardHeader>
                            <CardTitle className="!font-headline text-2xl mb-2">{pena.title}</CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground justify-center md:justify-start">
                                <pena.icon className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                                <span>{pena.day}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{pena.description}</p>
                            <Button asChild variant="outline">
                                <Link href={`/penas/${pena.id}`}>
                                    Saber más <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                     </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
