import type { PostMeta } from '@/lib/types';

export const meta: PostMeta = {
  title: 'Un Sabor de Andalucía: La Historia del Gazpacho',
  description: 'Descubre la refrescante historia del Gazpacho, la icónica sopa fría que captura la esencia de un verano andaluz.',
  author: 'Mateo Castillo',
  date: '15 de junio de 2024',
  image: 'blog-cuisine',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Cuando el sol cae a plomo sobre los campos de Andalucía, hay un plato que proporciona un alivio perfecto y refrescante: el Gazpacho. Esta sopa vibrante y fría es más que una delicia culinaria; es un sorbo de historia, un símbolo de ingenio y la esencia líquida de un verano español.
      </p>
      
      <p>
        Los orígenes del Gazpacho son antiguos y humildes. Su forma más temprana era una simple mezcla de pan duro, aceite de oliva, agua, vinagre y ajo, machacados en un mortero. Los soldados romanos y los trabajadores del campo andaluces dependían de esta mezcla sustanciosa e hidratante para sobrevivir a las largas y calurosas jornadas. Era un plato de campesinos, nacido de la necesidad de aprovechar hasta la última miga de pan y la abundancia de los olivares locales.
      </p>
      
      <h3 className="!font-headline text-2xl mt-8">La Transformación del Tomate</h3>
      <p>
        El Gazpacho que conocemos y amamos hoy en día, de color rojo brillante y rebosante de sabor, es una invención relativamente moderna. Los tomates y pimientos, ahora centrales en la receta, fueron traídos a España desde las Américas en el siglo XVI. Sin embargo, no fue hasta el siglo XIX que se incorporaron comúnmente a la sopa, transformándola de un simple caldo blanco en el icono rojo rubí que es hoy.
      </p>

      <div className="my-8 p-6 bg-secondary rounded-lg border border-primary/20">
        <h4 className="!font-headline text-xl mt-0">Ingredientes Clásicos del Gazpacho</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Tomates maduros</li>
          <li>Pepino</li>
          <li>Pimiento (generalmente verde)</li>
          <li>Cebolla</li>
          <li>Ajo</li>
          <li>Aceite de oliva virgen extra</li>
          <li>Vinagre de Jerez</li>
          <li>Pan duro (para la textura)</li>
        </ul>
      </div>

      <p>
        Hoy en día, existen innumerables variaciones. Algunas añaden sandía para darle dulzura, otras almendras para una textura cremosa (ajo blanco), pero la versión clásica andaluza sigue siendo un testimonio del poder de los ingredientes simples y frescos. Es un plato saludable, delicioso e increíblemente versátil que cuenta la historia de Andalucía en cada cucharada.
      </p>
    </div>
  );
}
