
'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Utensils, Palette, Dumbbell, Atom, Castle, BookOpen, Anchor, Crown, Feather } from 'lucide-react';
import { useRef } from 'react';
import Autoplay from "embla-carousel-autoplay";

const cultureTopics = [
  {
    id: 'food',
    title: 'Gastronomía',
    description: 'La cocina andaluza es un rico tapiz de sabores, con platos icónicos como el gazpacho, la paella y el jamón ibérico. Sus tradiciones culinarias son un legado de las diversas culturas que han llamado a esta tierra su hogar.',
    image: 'culture-food',
    icon: Utensils,
  },
  {
    id: 'art',
    title: 'Arte y Arquitectura',
    description: 'Desde los impresionantes arcos de la Mezquita de Córdoba hasta el apasionado arte del Flamenco, Andalucía es una obra maestra. Descubre el legado de pintores como Velázquez y Picasso.',
    image: 'culture-art',
    icon: Palette,
  },
  {
    id: 'sports',
    title: 'Deportes y Ocio',
    description: 'Más allá del fútbol, Andalucía tiene una rica tradición ecuestre, con la Real Escuela Andaluza del Arte Ecuestre preservando la doma clásica. La región también ofrece golf y deportes acuáticos de primer nivel.',
    image: 'culture-sports',
    icon: Dumbbell,
  },
  {
    id: 'science',
    title: 'Ciencia e Historia',
    description: 'Durante la Edad de Oro, ciudades como Córdoba fueron centros mundiales de aprendizaje. Eruditos andaluces hicieron grandes avances en medicina, astronomía y matemáticas, preservando el conocimiento clásico.',
    image: 'culture-science',
    icon: Atom,
  },
  {
    id: 'al-andalus',
    title: 'Al-Andalus',
    description: 'El corazón de la España musulmana durante casi 800 años, dejando un legado de arquitectura impresionante como la Alhambra, y profundas influencias en la ciencia, la poesía y la música.',
    image: 'culture-al-andalus',
    icon: Castle,
  },
  {
    id: 'reconquista',
    title: 'La Reconquista',
    description: 'El período de siglos en el que los reinos cristianos se expandieron y finalmente unificaron España, concluyendo con la caída de Granada en 1492, rediseñando el paisaje cultural.',
    image: 'culture-reconquista',
    icon: Crown,
  },
  {
    id: 'discovery-age',
    title: 'Era de los Descubrimientos',
    description: 'Andalucía fue la puerta de entrada al Nuevo Mundo. Puertos como Sevilla y Cádiz fueron centros neurálgicos para la exploración, el comercio y el intercambio de culturas entre continentes.',
    image: 'culture-discovery',
    icon: Anchor,
  },
  {
    id: 'golden-age',
    title: 'Siglo de Oro',
    description: 'Un período de florecimiento del arte y la literatura. Las ciudades andaluzas, especialmente Sevilla, fueron cuna de maestros pintores como Velázquez y Murillo, definiendo el Barroco español.',
    image: 'culture-golden-age',
    icon: Feather,
  },
  {
    id: 'roman-legacy',
    title: 'Legado Romano',
    description: 'Conocida como Bética, Andalucía fue una provincia romana vital, cuna de emperadores como Trajano. Las ruinas de Itálica y el puente de Córdoba son testimonios de esta era.',
    image: 'culture-roman-legacy',
    icon: BookOpen,
  }
];

export default function CulturePage() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">El Alma de Andalucía</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Viaja a través de las diversas facetas de la cultura andaluza. Una tierra de historia, arte y pasión, cuya influencia resuena en todo el mundo.
          </p>
        </div>

        <div className="flex justify-center">
            <Carousel
            plugins={[plugin.current]}
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full max-w-4xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            >
            <CarouselContent>
                {cultureTopics.map((topic) => {
                const topicImage = PlaceHolderImages.find(p => p.id === topic.image);
                return (
                    <CarouselItem key={topic.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                                {topicImage && (
                                <div className="relative h-64 w-full">
                                    <Image
                                    src={topicImage.imageUrl}
                                    alt={topicImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={topicImage.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <topic.icon className="h-10 w-10 text-white" />
                                    </div>
                                </div>
                                )}
                                <CardHeader>
                                <CardTitle className="!font-headline text-2xl">{topic.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{topic.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                );
                })}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
            </Carousel>
        </div>

      </div>
    </div>
  );
}
