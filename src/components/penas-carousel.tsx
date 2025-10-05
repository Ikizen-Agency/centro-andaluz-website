'use client';
import Image from 'next/image';
import Link from 'next/link';
import * as lucideIcons from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useRef } from 'react';
import Autoplay from "embla-carousel-autoplay";
import { useSupabaseSelect } from '@/supabase/hooks';
import type { Pena } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function PenasCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const { data, isLoading } = useSupabaseSelect<Pena>('penas', { order: { column: 'title', ascending: true } });
  const penas = Array.isArray(data) ? data : [];

  const getIconComponent = (iconName: string | lucideIcons.LucideIcon) => {
    if (typeof iconName !== 'string') return iconName as lucideIcons.LucideIcon;
    const IconComponent = (lucideIcons as any)[iconName];
    return IconComponent || lucideIcons.HelpCircle;
  };

  return (
    <div className="flex justify-center">
        <Carousel
        plugins={[plugin.current]}
        opts={{
            align: "start",
            loop: true,
        }}
        className="w-full max-w-6xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        >
        <CarouselContent>
            {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                        <Card className="overflow-hidden shadow-lg flex flex-col h-full">
                            <Skeleton className="h-64 w-full" />
                            <CardHeader>
                                <Skeleton className="h-8 w-3/4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6 mt-2" />
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            ))}
            {penas && penas.map((pena) => {
            const penaImage = PlaceHolderImages.find(p => p.id === pena.image);
            const PenaIcon = getIconComponent(pena.icon);
            return (
                <CarouselItem key={pena.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                         <Link href={`/penas/${pena.id}`} className="block h-full group">
                            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-transparent group-hover:border-primary">
                                {penaImage && (
                                <div className="relative h-64 w-full">
                                    <Image
                                    src={penaImage.imageUrl}
                                    alt={penaImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={penaImage.imageHint}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <PenaIcon className="h-10 w-10 text-white" />
                                    </div>
                                </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="!font-headline text-2xl">{pena.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">{pena.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </CarouselItem>
            );
            })}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
        </Carousel>
    </div>
  );
}
