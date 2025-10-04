import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'The Art of Flamenco: More Than Just a Dance',
  description: 'Delve into the history, emotion, and cultural significance of Flamenco, the soul of Andalusia.',
  author: 'Isabella Reyes',
  date: 'July 22, 2024',
  image: 'blog-flamenco',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Flamenco is not merely a dance; it is a profound art form, a cry from the soul expressed through song (cante), dance (baile), and guitar (toque). Born from the marginalized communities of 18th-century Andalusia, it is a powerful fusion of cultures.
      </p>
      
      <p>
        The origins of Flamenco are as complex and mysterious as the art form itself. It is widely believed to be the result of a cultural melting pot in Andalusia, where the traditions of the Gitanos (Romani people of Spain), Moors, Jews, and native Andalusians intertwined over centuries. This synthesis created a unique form of expression, one that speaks of persecution, profound sorrow, deep love, and unbridled joy.
      </p>

      <Card className="my-8 bg-secondary border-accent/50">
        <CardContent className="pt-6">
          <blockquote className="text-xl italic font-semibold text-center text-accent-foreground/80 !font-headline m-0 p-0 border-0">
            “El duende… a mysterious power which all may feel and no philosophy can explain.”
            <footer className="text-sm font-normal not-italic mt-2 block">- Federico García Lorca</footer>
          </blockquote>
        </CardContent>
      </Card>

      <h3 className="!font-headline text-2xl mt-8">The Pillars of Flamenco</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Cante (Song):</strong> The heart of flamenco. The singer (cantaor/a) conveys the emotional core of the performance, with lyrics that often tell stories of life's hardships and triumphs.</li>
        <li><strong>Baile (Dance):</strong> The physical interpretation of the music and song. The dancer (bailaor/a) uses their entire body—from the percussive footwork (zapateado) to the graceful hand movements (floreo)—to express the narrative.</li>
        <li><strong>Toque (Guitar):</strong> The flamenco guitar provides the harmonic and rhythmic structure. It is more than mere accompaniment; it engages in a passionate dialogue with the singer and dancer.</li>
      </ul>

      <p>
        Here at the Centro Andaluz de la Habana, we are committed to honoring this powerful tradition. Our classes and performances aim to capture the authentic spirit of "duende," that elusive, soul-stirring quality that makes flamenco an unforgettable experience. We invite you to join us and feel its power for yourself.
      </p>
    </div>
  );
}
