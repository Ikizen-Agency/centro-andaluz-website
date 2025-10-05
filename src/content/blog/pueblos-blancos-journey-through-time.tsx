import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'Pueblos Blancos: Un Viaje a Través del Tiempo',
  description: 'Pasea por las encantadoras y soleadas calles de los famosos "Pueblos Blancos" de Andalucía y descubre su historia.',
  author: 'Elena Torres',
  date: '30 de julio de 2024',
  image: 'blog-pueblos-blancos',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Esparcidos por las onduladas colinas de Andalucía se encuentran los "Pueblos Blancos". Estos pintorescos pueblos, con sus paredes encaladas, tejados rojos y calles estrechas y sinuosas, son una imagen por excelencia del sur de España.
      </p>

      <p>
        Su apariencia distintiva tiene un propósito práctico. La cal refleja el intenso sol del verano, manteniendo frescos los interiores de las casas. Históricamente, también se creía que esta práctica tenía propiedades antisépticas, ayudando a prevenir enfermedades.
      </p>

      <Card className="my-8 bg-secondary border-accent/50">
        <CardContent className="pt-6">
          <blockquote className="text-xl italic font-semibold text-center text-accent-foreground/80 !font-headline m-0 p-0 border-0">
            Estos pueblos son más que hermosos; son historia viva, encaramados en las cimas de las colinas como fortalezas defensivas durante los siglos de conflicto between cristianos y moros.
          </blockquote>
        </CardContent>
      </Card>

      <h3 className="!font-headline text-2xl mt-8">Una Ruta de Descubrimiento</h3>
      <p>
        La "Ruta de los Pueblos Blancos" es una popular ruta turística que serpentea por las provincias de Cádiz y Málaga. Cada pueblo ofrece su propio encanto único:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Arcos de la Frontera:</strong> Dramáticamente encaramado en una cresta de piedra caliza, su centro histórico es un laberinto de calles empedradas.</li>
        <li><strong>Ronda:</strong> Famosa por su espectacular puente "Puente Nuevo" que cruza un profundo desfiladero.</li>
        <li><strong>Grazalema:</strong> Enclavado en un alto paso de montaña, conocido por su impresionante parque natural y su microclima único.</li>
        <li><strong>Zahara de la Sierra:</strong> Dominado por un castillo morisco, con un hermoso embalse debajo.</li>
      </ul>
      <p>
        Explorar estos pueblos es como retroceder en el tiempo. Encontrarás iglesias antiguas, restos de castillos moriscos y patios llenos de flores escondidos detrás de puertas sin pretensiones. Es un viaje que revela el alma resiliente y hermosa de la Andalucía rural.
      </p>
    </div>
  );
}
