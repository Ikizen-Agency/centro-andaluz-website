
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPena, getPenas } from '@/lib/penas';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';


type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pena = await getPena(params.slug);

  if (!pena) {
    return {
      title: 'Peña no encontrada',
    };
  }

  return {
    title: `${pena.title} | Peñas Culturales`,
    description: pena.description,
  };
}

export async function generateStaticParams() {
  const penas = await getPenas();
  return penas.map((pena) => ({
    slug: pena.id,
  }));
}

export default async function PenaDetailPage({ params }: Props) {
  const pena = await getPena(params.slug);

  if (!pena) {
    notFound();
  }

  const PenaIcon = pena.icon as LucideIcon;
  const penaImage = PlaceHolderImages.find((p) => p.id === pena.image);

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-background rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div className="relative h-64 md:h-80 w-full">
            {penaImage && (
              <Image
                src={penaImage.imageUrl}
                alt={penaImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={penaImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white !font-headline">
                {pena.title}
              </h1>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center text-muted-foreground mb-6">
                <PenaIcon className="h-6 w-6 mr-3 text-primary flex-shrink-0" />
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-semibold">{pena.day}</span>
            </div>
            
            <div className="prose prose-lg lg:prose-xl max-w-none mx-auto text-foreground/90">
                <p className="lead">{pena.description}</p>
                <p>{pena.longDescription}</p>
            </div>

            <div className="mt-8 text-center">
                 <Button size="lg" variant="outline" asChild>
                    <Link href="/penas">
                        Volver a las Peñas
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
