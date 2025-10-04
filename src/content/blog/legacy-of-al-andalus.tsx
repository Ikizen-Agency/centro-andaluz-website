import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'The Legacy of Al-Andalus: Science and Knowledge',
  description: 'Discover the immense contributions of Moorish Spain to science, medicine, and philosophy that shaped European civilization.',
  author: 'Mateo Castillo',
  date: 'July 28, 2024',
  image: 'blog-alandalus-science',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        While much of Europe was in the Dark Ages, Al-Andalus—Moorish Spain—was a beacon of learning and innovation. For nearly 800 years, its cities, particularly Córdoba, were vibrant centers of intellectual life, preserving ancient knowledge and making groundbreaking discoveries.
      </p>

      <p>
        Scholars of Muslim, Jewish, and Christian faiths coexisted and collaborated, translating classical Greek texts into Arabic and Latin, which would later fuel the Renaissance in Europe. The Great Mosque of Córdoba was not just a religious center; its adjoining libraries and schools attracted thinkers from across the known world.
      </p>

      <h3 className="!font-headline text-2xl mt-8">Innovations in Science and Medicine</h3>
      <p>
        The contributions from this era were vast and transformative:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Medicine:</strong> Physicians like Albucasis (Abul Qasim al-Zahrawi) pioneered surgical techniques and invented dozens of medical instruments. His encyclopedia of surgery was a standard text in Europe for centuries.</li>
        <li><strong>Astronomy:</strong> Astronomers such as Al-Zarqali (Arzachel) refined the astrolabe, created highly accurate astronomical tables (the Tables of Toledo), and correctly theorized that planetary orbits were elliptical, not circular.</li>
        <li><strong>Mathematics:</strong> Al-Andalus was instrumental in introducing Arabic numerals and the concept of zero to Europe, revolutionizing calculation and paving the way for modern mathematics.</li>
        <li><strong>Agriculture:</strong> They introduced new crops like citrus fruits, sugar cane, and rice, along with advanced irrigation techniques (acequias) that are still in use today.</li>
      </ul>

      <Card className="my-8 bg-secondary border-primary/20">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground m-0 p-0">
            The intellectual and cultural legacy of Al-Andalus is a reminder of the power of cross-cultural exchange and the enduring pursuit of knowledge. Its influence is deeply woven into the fabric of Spanish and European identity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
