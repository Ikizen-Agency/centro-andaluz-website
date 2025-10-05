
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, MapPin } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Event } from '@/lib/types';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';


export default function EventsPage() {
  const firestore = useFirestore();
  const eventsCollection = useMemoFirebase(() => collection(firestore, "events"), [firestore]);
  const { data: events, isLoading } = useCollection<Event>(eventsCollection);
  
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Próximos Eventos</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Únete a nosotros para una celebración de la cultura andaluza. Desde apasionadas noches de flamenco hasta talleres culinarios, hay algo para todos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && Array.from({ length: 3 }).map((_, i) => (
             <Card key={i} className="overflow-hidden shadow-lg flex flex-col">
                <Skeleton className="h-48 w-full" />
                <CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full mt-2" />
                   <Skeleton className="h-4 w-5/6" />
                </CardContent>
            </Card>
          ))}
          {events && events.map((event) => {
            const eventImage = PlaceHolderImages.find(p => p.id === event.image);
            return (
              <Card key={event.slug} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <Link href={`/events/${event.slug}`} className="block flex flex-col h-full">
                  {eventImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={eventImage.imageUrl}
                        alt={eventImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={eventImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="!font-headline text-2xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="space-y-2 text-muted-foreground text-sm mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground flex-grow line-clamp-3">{event.description}</p>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
