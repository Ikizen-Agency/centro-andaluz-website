import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'Semana Santa in Seville: A Spectacle of Devotion',
  description: 'Experience the profound emotion and solemn beauty of Holy Week in Seville, one of the world\'s most famous religious festivals.',
  author: 'Isabella Reyes',
  date: 'July 25, 2024',
  image: 'blog-semana-santa',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Every spring, the city of Seville transforms. The air fills with the scent of incense and beeswax, the sound of solemn drumbeats echoes through the streets, and a palpable sense of devotion takes hold. This is Semana Santa, or Holy Week, a tradition that dates back to the 16th century and is one of the most breathtaking cultural events in Spain.
      </p>
      
      <p>
        For seven days, from Palm Sunday to Easter Sunday, religious brotherhoods known as "cofradías" lead processions through the city. The central features of these processions are the magnificent "pasos," large, ornate floats depicting scenes from the Passion of Christ and sorrows of the Virgin Mary.
      </p>

      <h3 className="!font-headline text-2xl mt-8">The Nazarenos and the Pasos</h3>
      <p>
        The streets are filled with "nazarenos," members of the brotherhoods who wear penitential robes and conical hoods ("capirotes") that conceal their faces, a symbol of mourning and anonymity in their penance. They walk in silent procession, carrying long wax candles.
      </p>

      <p>
        The "pasos" themselves are masterpieces of religious art, often centuries old, adorned with intricate goldwork, embroidery, and countless flowers. They are carried on the shoulders of "costaleros," who are hidden from view beneath the float. Their rhythmic, swaying walk gives the statues a lifelike quality, a sight that is both solemn and deeply moving.
      </p>

      <Card className="my-8 bg-secondary border-accent/50">
        <CardContent className="pt-6">
            <p className="m-0 p-0">
                A key moment in any procession is the "saeta," a spontaneous, mournful flamenco prayer sung from a balcony as a paso passes by. It is a heart-wrenching expression of devotion that can bring an entire street to a standstill.
            </p>
        </CardContent>
      </Card>
      
      <p>
        Semana Santa in Seville is more than a religious observance; it is a multisensory experience that encapsulates art, history, music, and community faith. It's a profound cultural spectacle that must be seen to be truly understood.
      </p>
    </div>
  );
}
