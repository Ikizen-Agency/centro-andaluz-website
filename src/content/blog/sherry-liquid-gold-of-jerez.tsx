import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'Jerez: El Oro Líquido de Andalucía',
  description: 'Descorcha la historia del Jerez, el vino fortificado único de los soleados viñedos del "Triángulo del Jerez" en Andalucía.',
  author: 'Carlos Fernandez',
  date: '20 de julio de 2024',
  image: 'blog-sherry-wine',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        En un rincón del suroeste de Andalucía se encuentra una región conocida como el "Triángulo del Jerez", delimitada por las localidades de Jerez de la Frontera, Sanlúcar de Barrameda y El Puerto de Santa María. Este es el único lugar en la Tierra que puede producir el vino fortificado único y complejo conocido como Jerez.
      </p>
      
      <p>
        La historia del Jerez es tan rica y estratificada como sus sabores. La vinicultura en la región se remonta a los fenicios, hace más de 3.000 años. El vino ganó fama internacional en la Era de los Descubrimientos, ya que su naturaleza fortificada lo hacía estable para largos viajes por mar. Era uno de los favoritos de exploradores como Magallanes y ha sido inmortalizado en las obras de Shakespeare.
      </p>

      <h3 className="!font-headline text-2xl mt-8">La Magia del Sistema de Solera</h3>
      <p>
        Lo que hace verdaderamente único al Jerez es su proceso de envejecimiento, el sistema de "solera y criadera". Este es un proceso dinámico de mezcla fraccionada, donde los vinos más jóvenes se mezclan sistemáticamente con vinos más viejos a lo largo de muchos años.
      </p>
      
      <div className="my-8 p-6 bg-secondary rounded-lg border border-primary/20">
        <p>El sistema de solera implica pilas de barricas. El vino para embotellar se extrae de la fila inferior (la "solera"), y luego las barricas se rellenan con vino de la fila superior (la "criadera"). La fila superior se llena entonces con el vino más nuevo. Esto asegura un producto final consistente y de alta calidad que mezcla vinos de muchas edades diferentes.</p>
      </div>

      <h3 className="!font-headline text-2xl mt-8">Un Espectro de Estilos</h3>
      <p>
        El Jerez no es un solo tipo de vino, sino un amplio espectro de estilos, que van desde el extremadamente seco hasta el deliciosamente dulce:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Fino y Manzanilla:</strong> Pálido, seco y delicado, envejecido bajo una capa de levadura llamada "flor".</li>
        <li><strong>Amontillado:</strong> De color ámbar y con notas a frutos secos, comienza su vida como un Fino pero luego envejece de forma oxidativa.</li>
        <li><strong>Oloroso:</strong> Oscuro, rico y con cuerpo, envejecido completamente en presencia de oxígeno.</li>
        <li><strong>Pedro Ximénez (PX):</strong> Un vino de postre intensamente dulce elaborado con uvas pasificadas al sol.</li>
      </ul>
      
      <p>
        Desde un aperitivo fresco hasta un maridaje complejo para el postre, hay un Jerez para cada ocasión. Explorar su diverso mundo es saborear el sol, la tierra y la historia de Andalucía.
      </p>
    </div>
  );
}
