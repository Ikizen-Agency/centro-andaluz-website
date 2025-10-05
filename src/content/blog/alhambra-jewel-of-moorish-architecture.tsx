import type { PostMeta } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'La Alhambra: Joya de la Arquitectura Morisca',
  description: 'Explora la impresionante belleza y la intrincada historia del palacio de la Alhambra en Granada, una obra maestra del arte islámico.',
  author: 'Javier Gomez',
  date: '01 de agosto de 2024',
  image: 'blog-alhambra',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Situada en lo alto de una colina con vistas a la ciudad de Granada, la Alhambra se erige como un testimonio de la brillantez del arte y la arquitectura morisca en España. Parte fortaleza, parte palacio y parte jardín, este extenso complejo es un viaje al corazón de la dinastía nazarí.
      </p>
      
      <p>
        El nombre "Alhambra" deriva del árabe "al-qala'a al-hamra", que significa "el castillo rojo", en referencia a los ladrillos de tapia secados al sol de sus muros exteriores. Aunque sus orígenes se remontan a una fortaleza del siglo IX, las magníficas estructuras que vemos hoy fueron construidas principalmente por los emires nazaríes en los siglos XIII y XIV.
      </p>

      <h3 className="!font-headline text-2xl mt-8">Un Palacio de Ilusiones</h3>
      <p>
        La magia de la Alhambra reside en sus detalles. Muros aparentemente sólidos se disuelven en delicadas celosías de estuco, la luz del sol se filtra a través de intrincados patrones geométricos y los patios se llenan con el suave murmullo de las fuentes. Los arquitectos combinaron magistralmente el espacio, la luz, el agua y la decoración para crear una atmósfera de paraíso en la Tierra.
      </p>

      <Card className="my-8 bg-secondary border-primary/20">
        <CardHeader>
          <CardTitle className="!font-headline text-xl">Áreas Clave para Visitar</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Los Palacios Nazaríes:</strong> El corazón de la Alhambra, que comprende el Mexuar, el Palacio de Comares y el espectacular Palacio de los Leones.</li>
                <li><strong>El Generalife:</strong> El palacio de verano y finca de recreo de los gobernantes nazaríes, con impresionantes jardines y juegos de agua.</li>
                <li><strong>La Alcazaba:</strong> La parte más antigua de la Alhambra, una fortaleza militar que ofrece vistas panorámicas de Granada.</li>
            </ul>
        </CardContent>
      </Card>

      <p>
        El uso de la caligrafía es fundamental en la decoración, con poemas y versos del Corán adornando las paredes. El famoso Patio de los Leones, con su fuente central sostenida por doce leones de mármol, es una obra maestra de la escultura y la ingeniería hidráulica. La Alhambra es más que un palacio; es un libro de cuentos escrito en piedra, agua y luz.
      </p>
    </div>
  );
}
