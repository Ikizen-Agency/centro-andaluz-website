import type { PostMeta } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'The Alhambra: A Jewel of Moorish Architecture',
  description: 'Explore the breathtaking beauty and intricate history of the Alhambra palace in Granada, a masterpiece of Islamic art.',
  author: 'Javier Gomez',
  date: 'August 01, 2024',
  image: 'blog-alhambra',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Perched atop a hill overlooking the city of Granada, the Alhambra stands as a testament to the brilliance of Moorish art and architecture in Spain. Part fortress, part palace, and part garden, this sprawling complex is a journey into the heart of the Nasrid dynasty.
      </p>
      
      <p>
        The name "Alhambra" derives from the Arabic "al-qala'a al-hamra," meaning "the red castle," a reference to the sun-dried tapia bricks of its outer walls. While its origins date back to a 9th-century fortress, the magnificent structures we see today were primarily built by the Nasrid emirs in the 13th and 14th centuries.
      </p>

      <h3 className="!font-headline text-2xl mt-8">A Palace of Illusions</h3>
      <p>
        The magic of the Alhambra lies in its details. Seemingly solid walls dissolve into delicate stucco lacework, sunlight filters through intricate geometric patterns, and courtyards are filled with the gentle murmur of fountains. The architects masterfully combined space, light, water, and decoration to create an atmosphere of paradise on Earth.
      </p>

      <Card className="my-8 bg-secondary border-primary/20">
        <CardHeader>
          <CardTitle className="!font-headline text-xl">Key Areas to Visit</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>The Nasrid Palaces:</strong> The heart of the Alhambra, comprising the Mexuar, the Comares Palace, and the spectacular Palace of the Lions.</li>
                <li><strong>The Generalife:</strong> The summer palace and country estate of the Nasrid rulers, with stunning gardens and water features.</li>
                <li><strong>The Alcazaba:</strong> The oldest part of the Alhambra, a military fortress offering panoramic views of Granada.</li>
            </ul>
        </CardContent>
      </Card>

      <p>
        The use of calligraphy is central to the decoration, with poems and verses from the Quran adorning the walls. The famous Court of the Lions, with its central fountain supported by twelve marble lions, is a masterpiece of sculpture and hydraulic engineering. The Alhambra is more than a palace; it's a storybook written in stone, water, and light.
      </p>
    </div>
  );
}
