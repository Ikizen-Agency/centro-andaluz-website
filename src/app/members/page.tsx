import Image from 'next/image';
import type { Metadata } from 'next';
import { members } from '@/lib/members';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const metadata: Metadata = {
  title: 'Nuestra Comunidad | Centro Andaluz de la Habana',
  description: 'Conoce a los dedicados miembros y al equipo de liderazgo del Centro Andaluz de la Habana.',
};

export default function MembersPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Nuestra Comunidad</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            El corazón de nuestro centro es su gente. Conoce a las personas dedicadas a preservar y compartir la cultura andaluza.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {members.map((member) => {
            const memberImage = PlaceHolderImages.find(p => p.id === member.image);
            return (
              <Card key={member.id} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary/20">
                     {memberImage && <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />}
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold !font-headline">{member.name}</h3>
                  <p className="text-accent font-semibold">{member.role}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
