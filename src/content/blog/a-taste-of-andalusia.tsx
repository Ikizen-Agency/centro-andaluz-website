import type { PostMeta } from '@/lib/types';

export const meta: PostMeta = {
  title: 'A Taste of Andalusia: The Story of Gazpacho',
  description: 'Discover the refreshing history of Gazpacho, the iconic cold soup that captures the essence of an Andalusian summer.',
  author: 'Mateo Castillo',
  date: 'June 15, 2024',
  image: 'blog-cuisine',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        When the sun beats down on the fields of Andalusia, there is one dish that provides perfect, refreshing relief: Gazpacho. This vibrant, chilled soup is more than just a culinary delight; it's a taste of history, a symbol of resourcefulness, and the liquid essence of a Spanish summer.
      </p>
      
      <p>
        The origins of Gazpacho are ancient and humble. Its earliest form was a simple blend of stale bread, olive oil, water, vinegar, and garlic, pounded in a mortar and pestle. Roman soldiers and Andalusian field workers relied on this hearty, hydrating mixture to sustain them through long, hot days. It was a peasant's dish, born from the need to use every last scrap of bread and the bounty of the local olive groves.
      </p>
      
      <h3 className="!font-headline text-2xl mt-8">The Tomato Transformation</h3>
      <p>
        The Gazpacho we know and love today—bright red and bursting with flavor—is a relatively modern invention. Tomatoes and peppers, now central to the recipe, were brought to Spain from the Americas in the 16th century. However, it wasn't until the 19th century that they were commonly incorporated into the soup, transforming it from a simple white broth into the ruby-red icon it is today.
      </p>

      <div className="my-8 p-6 bg-secondary rounded-lg border border-primary/20">
        <h4 className="!font-headline text-xl mt-0">Classic Gazpacho Ingredients</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Ripe tomatoes</li>
          <li>Cucumber</li>
          <li>Bell pepper (typically green)</li>
          <li>Onion</li>
          <li>Garlic</li>
          <li>Extra virgin olive oil</li>
          <li>Sherry vinegar</li>
          <li>Stale bread (for texture)</li>
        </ul>
      </div>

      <p>
        Today, countless variations exist. Some add watermelon for sweetness, others almonds for a creamy texture (ajo blanco), but the classic Andalusian version remains a testament to the power of simple, fresh ingredients. It's a healthy, delicious, and incredibly versatile dish that tells the story of Andalusia in every spoonful.
      </p>
    </div>
  );
}
