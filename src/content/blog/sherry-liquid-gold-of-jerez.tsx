import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'Sherry: The Liquid Gold of Jerez',
  description: 'Uncork the history of Sherry, the unique fortified wine from the sun-drenched vineyards of Andalusia\'s "Sherry Triangle".',
  author: 'Carlos Fernandez',
  date: 'July 20, 2024',
  image: 'blog-sherry-wine',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        In the corner of southwestern Andalusia lies a region known as the "Sherry Triangle," defined by the towns of Jerez de la Frontera, Sanlúcar de Barrameda, and El Puerto de Santa María. This is the one place on Earth that can produce the unique and complex fortified wine known as Sherry.
      </p>
      
      <p>
        Sherry's history is as rich and layered as its flavors. Winemaking in the region dates back to the Phoenicians over 3,000 years ago. The wine gained international fame in the Age of Discovery, as its fortified nature made it stable for long sea voyages. It was a favorite of explorers like Magellan and has been immortalized in the works of Shakespeare.
      </p>

      <h3 className="!font-headline text-2xl mt-8">The Magic of the Solera System</h3>
      <p>
        What makes Sherry truly unique is its aging process, the "solera y criadera" system. This is a dynamic process of fractional blending, where younger wines are systematically mixed with older wines over many years.
      </p>
      
      <div className="my-8 p-6 bg-secondary rounded-lg border border-primary/20">
        <p>The solera system involves stacks of barrels. Wine for bottling is drawn from the bottom (the "solera"), and then the barrels are topped up with wine from the row above (the "criadera"). The top row is then filled with the newest wine. This ensures a consistent, high-quality final product that blends wines of many different ages.</p>
      </div>

      <h3 className="!font-headline text-2xl mt-8">A Spectrum of Styles</h3>
      <p>
        Sherry is not a single type of wine but a wide spectrum of styles, ranging from bone-dry to lusciously sweet:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Fino and Manzanilla:</strong> Pale, dry, and delicate, aged under a layer of yeast called "flor."</li>
        <li><strong>Amontillado:</strong> Amber-colored and nutty, starting its life as a Fino but then aged oxidatively.</li>
        <li><strong>Oloroso:</strong> Dark, rich, and full-bodied, aged entirely in the presence of oxygen.</li>
        <li><strong>Pedro Ximénez (PX):</strong> An intensely sweet dessert wine made from sun-dried grapes.</li>
      </ul>
      
      <p>
        From a crisp aperitif to a complex dessert pairing, there is a Sherry for every occasion. Exploring its diverse world is to taste the sun, soil, and history of Andalusia.
      </p>
    </div>
  );
}
