
'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { useSupabaseSelect } from '@/supabase/hooks';
import type { Pena } from '@/lib/types';
import * as lucideIcons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  params: { slug: string };
};

export default function PenaDetailPage({ params }: Props) {
  const { data, isLoading } = useSupabaseSelect<Pena>('penas', { single: true, eq: [{ column: 'id', value: params.slug }] });
  const pena = (data && !Array.isArray(data)) ? data : null;

  if (isLoading) {
    return (
        <div className="bg-secondary">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="bg-background rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
                <Skeleton className="h-64 md:h-80 w-full" />
                <div className="p-6 md:p-8">
                    <Skeleton className="h-10 w-3/4 mb-6" />
                    <Skeleton className="h-6 w-1/3 mb-8" />
                    <Skeleton className="h-5 w-full mb-4" />
                    <Skeleton className="h-5 w-full mb-4" />
                    <Skeleton className="h-5 w-3/4" />
                </div>
            </div>
          </div>
        </div>
    )
  }

  if (!pena) {
    notFound();
  }

  const getIconComponent = (iconName: string | LucideIcon): LucideIcon => {
      if (typeof iconName !== 'string') return iconName;
      const Icon = (lucideIcons as any)[iconName];
      return Icon || HelpCircle;
  }

  const PenaIcon = getIconComponent(pena.icon);
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

// Keeping generateStaticParams can be useful for SSG if you have a build step
// that can pre-fetch these slugs, but it's not required for CSR/SSR with dynamic fetching.
// export async function generateStaticParams() {
//   // This would need to fetch slugs from Firestore at build time
//   return [];
// }
