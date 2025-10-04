import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'White Villages (Pueblos Blancos): A Journey Through Time',
  description: 'Wander through the charming, sun-drenched streets of Andalusia\'s famous "Pueblos Blancos" and discover their history.',
  author: 'Elena Torres',
  date: 'July 30, 2024',
  image: 'blog-pueblos-blancos',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Scattered across the rolling hills of Andalusia are the "Pueblos Blancos," or White Villages. These picturesque towns, with their whitewashed walls, red-tiled roofs, and narrow, winding streets, are a quintessential image of southern Spain.
      </p>

      <p>
        Their distinctive appearance has a practical purpose. The lime-based whitewash reflects the intense summer sun, keeping the interiors of the houses cool. Historically, this practice was also believed to have antiseptic properties, helping to ward off disease.
      </p>

      <Card className="my-8 bg-secondary border-accent/50">
        <CardContent className="pt-6">
          <blockquote className="text-xl italic font-semibold text-center text-accent-foreground/80 !font-headline m-0 p-0 border-0">
            These villages are more than just beautiful; they are living history, perched on hilltops as defensive strongholds during the centuries of conflict between Christians and Moors.
          </blockquote>
        </CardContent>
      </Card>

      <h3 className="!font-headline text-2xl mt-8">A Route of Discovery</h3>
      <p>
        The "Ruta de los Pueblos Blancos" is a popular tourist route that winds through the provinces of Cádiz and Málaga. Each village offers its own unique charm:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Arcos de la Frontera:</strong> Dramatically perched on a limestone ridge, its historic center is a maze of cobblestone streets.</li>
        <li><strong>Ronda:</strong> Famous for its spectacular "Puente Nuevo" bridge spanning a deep gorge.</li>
        <li><strong>Grazalema:</strong> Nestled in a high mountain pass, known for its stunning natural park and unique microclimate.</li>
        <li><strong>Zahara de la Sierra:</strong> Overlooked by a Moorish castle, with a beautiful reservoir below.</li>
      </ul>
      <p>
        Exploring these villages is like stepping back in time. You'll find ancient churches, remnants of Moorish castles, and flower-filled patios hidden behind unassuming doorways. It's a journey that reveals the resilient and beautiful soul of rural Andalusia.
      </p>
    </div>
  );
}
