import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'El Arte del Flamenco: Más que un Baile',
  description: 'Adéntrate en la historia, la emoción y el significado cultural del Flamenco, el alma de Andalucía.',
  author: 'Isabella Reyes',
  date: '22 de julio de 2024',
  image: 'blog-flamenco',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        El flamenco no es simplemente un baile; es una forma de arte profunda, un grito del alma expresado a través del cante, el baile y el toque de la guitarra. Nacido de las comunidades marginadas de la Andalucía del siglo XVIII, es una poderosa fusión de culturas.
      </p>
      
      <p>
        Los orígenes del flamenco son tan complejos y misteriosos como la propia forma de arte. Se cree ampliamente que es el resultado de un crisol cultural en Andalucía, donde las tradiciones de los gitanos, moros, judíos y andaluces nativos se entrelazaron durante siglos. Esta síntesis creó una forma de expresión única, que habla de persecución, profunda tristeza, amor intenso y alegría desenfrenada.
      </p>

      <Card className="my-8 bg-secondary border-accent/50">
        <CardContent className="pt-6">
          <blockquote className="text-xl italic font-semibold text-center text-accent-foreground/80 !font-headline m-0 p-0 border-0">
            “El duende… un poder misterioso que todos sienten y ninguna filosofía puede explicar.”
            <footer className="text-sm font-normal not-italic mt-2 block">- Federico García Lorca</footer>
          </blockquote>
        </CardContent>
      </Card>

      <h3 className="!font-headline text-2xl mt-8">Los Pilares del Flamenco</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Cante:</strong> El corazón del flamenco. El cantaor/a transmite el núcleo emocional de la actuación, con letras que a menudo cuentan historias de las dificultades y triunfos de la vida.</li>
        <li><strong>Baile:</strong> La interpretación física de la música y el cante. El bailaor/a utiliza todo su cuerpo —desde el percusivo zapateado hasta los gráciles movimientos de las manos (floreo)— para expresar la narrativa.</li>
        <li><strong>Toque (Guitarra):</strong> La guitarra flamenca proporciona la estructura armónica y rítmica. Es más que un simple acompañamiento; entabla un apasionado diálogo con el cantaor y el bailaor.</li>
      </ul>

      <p>
        Aquí en el Centro Andaluz de la Habana, estamos comprometidos a honrar esta poderosa tradición. Nuestras clases y actuaciones buscan capturar el auténtico espíritu del "duende", esa cualidad esquiva y conmovedora que hace del flamenco una experiencia inolvidable. Te invitamos a unirte a nosotros y sentir su poder por ti mismo.
      </p>
    </div>
  );
}
