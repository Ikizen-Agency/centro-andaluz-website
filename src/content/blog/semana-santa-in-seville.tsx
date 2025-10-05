import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'Semana Santa en Sevilla: Un Espectáculo de Devoción',
  description: 'Vive la profunda emoción y la solemne belleza de la Semana Santa en Sevilla, una de las festividades religiosas más famosas del mundo.',
  author: 'Isabella Reyes',
  date: '25 de julio de 2024',
  image: 'blog-semana-santa',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Cada primavera, la ciudad de Sevilla se transforma. El aire se llena del aroma a incienso y cera de abejas, el sonido de solemnes tambores resuena por las calles y un palpable sentido de devoción se apodera de todo. Esto es la Semana Santa, una tradición que se remonta al siglo XVI y es uno de los eventos culturales más impresionantes de España.
      </p>
      
      <p>
        Durante siete días, desde el Domingo de Ramos hasta el Domingo de Resurrección, las hermandades religiosas conocidas como "cofradías" realizan procesiones por la ciudad. Las piezas centrales de estas procesiones son los magníficos "pasos", grandes e-books-ornamentados que representan escenas de la Pasión de Cristo y los dolores de la Virgen María.
      </p>

      <h3 className="!font-headline text-2xl mt-8">Los Nazarenos y los Pasos</h3>
      <p>
        Las calles se llenan de "nazarenos", miembros de las hermandades que visten túnicas de penitencia y capirotes cónicos que ocultan sus rostros, un símbolo de luto y anonimato en su penitencia. Caminan en procesión silenciosa, portando largos cirios de cera.
      </p>

      <p>
        Los "pasos" en sí son obras maestras del arte religioso, a menudo con siglos de antigüedad, adornados con intrincados trabajos en oro, bordados e innumerables flores. Son llevados sobre los hombros de los "costaleros", que están ocultos a la vista bajo el paso. Su caminar rítmico y oscilante da a las estatuas una cualidad realista, una vista que es a la vez solemne y profundamente conmovedora.
      </p>

      <Card className="my-8 bg-secondary border-accent/50">
        <CardContent className="pt-6">
            <p className="m-0 p-0">
                Un momento clave en cualquier procesión es la "saeta", una oración flamenca espontánea y lastimera cantada desde un balcón al pasar un paso. Es una expresión desgarradora de devoción que puede detener a toda una calle.
            </p>
        </CardContent>
      </Card>
      
      <p>
        La Semana Santa en Sevilla es más que una observancia religiosa; es una experiencia multisensorial que encapsula arte, historia, música y fe comunitaria. Es un profundo espectáculo cultural que debe ser visto para ser verdaderamente comprendido.
      </p>
    </div>
  );
}
