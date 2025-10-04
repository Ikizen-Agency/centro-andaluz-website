
import Image from 'next/image';
import type { Metadata } from 'next';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Utensils, Palette, Dumbbell, Atom } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Culture | Centro Andaluz de la Habana',
  description: 'Explore the rich and diverse culture of Andalusia, from its cuisine to its scientific legacy.',
};

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
  }
];

export default function CulturePage() {
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
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full max-w-4xl"
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
