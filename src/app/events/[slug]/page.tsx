import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { events } from '@/lib/events';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = events.find((e) => e.slug === params.slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} | Centro Andaluz de la Habana`,
    description: event.description,
  };
}

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default function EventDetailPage({ params }: Props) {
  const event = events.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  const eventImage = PlaceHolderImages.find((p) => p.id === event.image);
  const galleryImages = event.gallery?.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean) || [];


  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-background rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            {eventImage && (
              <Image
                src={eventImage.imageUrl}
                alt={eventImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={eventImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white !font-headline">
                {event.title}
              </h1>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 p-6 md:p-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 !font-headline">About this Event</h2>
              <p className="text-lg text-foreground/80 whitespace-pre-line mb-8">{event.longDescription}</p>

              {galleryImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 !font-headline">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img) => img && (
                      <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={img.imageUrl}
                          alt={img.description}
                          fill
                          className="object-cover"
                          data-ai-hint={img.imageHint}
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {event.artists && event.artists.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 !font-headline">Guest Artists</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {event.artists.map((artist) => {
                      const artistImage = PlaceHolderImages.find(p => p.id === artist.image);
                      return (
                        <Card key={artist.name} className="flex items-center p-4">
                          <Avatar className="h-16 w-16 mr-4">
                             {artistImage && <AvatarImage src={artistImage.imageUrl} alt={artist.name} data-ai-hint={artistImage.imageHint} />}
                             <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-bold text-lg">{artist.name}</h4>
                            <p className="text-muted-foreground">{artist.instrument}</p>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
            <div className="md:col-span-1">
              <div className="bg-secondary p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-bold !font-headline">Details</h3>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                 <Button size="lg" variant="outline" className="w-full mt-4" asChild>
                    <Link href="/events">
                        Back to Events
                    </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
