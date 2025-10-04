
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
    title: 'Gastronomy',
    description: 'Andalusian cuisine is a rich tapestry of flavors, with iconic dishes like gazpacho, paella, and jamón ibérico. Its culinary traditions are a legacy of the diverse cultures that have called this land home.',
    image: 'culture-food',
    icon: Utensils,
  },
  {
    id: 'art',
    title: 'Art & Architecture',
    description: 'From the breathtaking arches of the Mezquita de Córdoba to the passionate art of Flamenco, Andalusia is a masterpiece. Discover the legacy of painters like Velázquez and Picasso.',
    image: 'culture-art',
    icon: Palette,
  },
  {
    id: 'sports',
    title: 'Sports & Leisure',
    description: 'Beyond football, Andalusia has a rich equestrian tradition, with the Royal Andalusian School of Equestrian Art preserving classic dressage. The region also offers world-class golf and water sports.',
    image: 'culture-sports',
    icon: Dumbbell,
  },
  {
    id: 'science',
    title: 'Science & History',
    description: 'During the Golden Age, cities like Córdoba were global centers of learning. Andalusian scholars made huge advances in medicine, astronomy, and mathematics, preserving classical knowledge.',
    image: 'culture-science',
    icon: Atom,
  },
  {
    id: 'al-andalus',
    title: 'Al-Andalus',
    description: 'The heart of Moorish Spain for nearly 800 years, leaving a legacy of stunning architecture like the Alhambra, and profound influences on science, poetry, and music.',
    image: 'culture-al-andalus',
    icon: Castle,
  },
  {
    id: 'reconquista',
    title: 'La Reconquista',
    description: 'The centuries-long period where Christian kingdoms expanded and ultimately unified Spain, concluding with the fall of Granada in 1492, reshaping the cultural landscape.',
    image: 'culture-reconquista',
    icon: Crown,
  },
  {
    id: 'discovery-age',
    title: 'Age of Discovery',
    description: 'Andalusia was the gateway to the New World. Ports like Seville and Cádiz were central hubs for exploration, trade, and the exchange of cultures between continents.',
    image: 'culture-discovery',
    icon: Anchor,
  },
  {
    id: 'golden-age',
    title: 'Siglo de Oro',
    description: 'A period of flourishing art and literature. Andalusian cities, especially Seville, were home to master painters like Velázquez and Murillo, defining Spanish Baroque.',
    image: 'culture-golden-age',
    icon: Feather,
  },
  {
    id: 'roman-legacy',
    title: 'Roman Legacy',
    description: 'Known as Baetica, Andalusia was a vital Roman province, giving birth to emperors like Trajan. Itálica\'s ruins and Córdoba\'s bridge are testaments to this era.',
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
          <h1 className="text-4xl md:text-5xl font-bold">The Soul of Andalusia</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Journey through the diverse facets of Andalusian culture. A land of history, art, and passion, its influence resonates across the globe.
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
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
