
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import * as lucideIcons from 'lucide-react';
import { useSupabaseSelect } from '@/supabase/hooks';
import type { Pena } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function PenasPage() {
    const { data, isLoading } = useSupabaseSelect<Pena>('penas', { order: { column: 'title', ascending: true } });
    const penas = Array.isArray(data) ? data : [];

    const getIconComponent = (iconName: string | LucideIcon): LucideIcon => {
        if (typeof iconName !== 'string') return iconName;
        const Icon = (lucideIcons as any)[iconName];
        return Icon || HelpCircle;
    }

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
            {isLoading && Array.from({length: 3}).map((_, index) => {
                const isEven = index % 2 === 0;
                return (
                     <div key={index} className="relative grid md:grid-cols-2 gap-8 items-center group">
                        <div className={`relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                            <Skeleton className="aspect-video rounded-lg w-full" />
                        </div>
                        <div className={`text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-8 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )
            })}
            {penas && penas.map((pena, index) => {
              const isEven = index % 2 === 0;
              const penaImage = PlaceHolderImages.find(p => p.id === pena.image);
              const PenaIcon = getIconComponent(pena.icon);
              return (
                <div key={pena.id} className="relative grid md:grid-cols-2 gap-8 items-center group">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-4 border-background hidden md:block" />

                  <div className={`relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <Link href={`/penas/${pena.id}`} className="block">
                      {penaImage && (
                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
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
                    </Link>
                  </div>
                  
                  <div className={`text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                     <Link href={`/penas/${pena.id}`} className="block">
                        <Card className="bg-card/80 backdrop-blur-sm border-0 md:border group-hover:border-primary/50 group-hover:shadow-xl transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="!font-headline text-2xl mb-2">{pena.title}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground justify-center md:justify-start">
                                    <PenaIcon className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                                    <span>{pena.day}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{pena.description}</p>
                                <div className="flex items-center text-primary font-semibold text-sm group-hover:underline">
                                    Saber más <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                     </Link>
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
