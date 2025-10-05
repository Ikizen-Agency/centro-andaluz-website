import type { PostMeta } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export const meta: PostMeta = {
  title: 'El Legado de Al-Andalus: Ciencia y Conocimiento',
  description: 'Descubre las inmensas contribuciones de la España musulmana a la ciencia, la medicina y la filosofía que moldearon la civilización europea.',
  author: 'Mateo Castillo',
  date: '28 de julio de 2024',
  image: 'blog-alandalus-science',
};

export default function PostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
      <p className="lead text-xl">
        Mientras gran parte de Europa se encontraba en la Edad Oscura, Al-Andalus —la España musulmana— era un faro de aprendizaje e innovación. Durante casi 800 años, sus ciudades, en particular Córdoba, fueron vibrantes centros de vida intelectual, preservando el conocimiento antiguo y realizando descubrimientos revolucionarios.
      </p>

      <p>
        Eruditos de las fes musulmana, judía y cristiana coexistieron y colaboraron, traduciendo textos griegos clásicos al árabe y al latín, lo que más tarde impulsaría el Renacimiento en Europa. La Gran Mezquita de Córdoba no era solo un centro religioso; sus bibliotecas y escuelas contiguas atraían a pensadores de todo el mundo conocido.
      </p>

      <h3 className="!font-headline text-2xl mt-8">Innovaciones en Ciencia y Medicina</h3>
      <p>
        Las contribuciones de esta época fueron vastas y transformadoras:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Medicina:</strong> Médicos como Albucasis (Abul Qasim al-Zahrawi) fueron pioneros en técnicas quirúrgicas e inventaron docenas de instrumentos médicos. Su enciclopedia de cirugía fue un texto de referencia en Europa durante siglos.</li>
        <li><strong>Astronomía:</strong> Astrónomos como Al-Zarqali (Arzachel) refinaron el astrolabio, crearon tablas astronómicas de gran precisión (las Tablas de Toledo) y teorizaron correctamente que las órbitas planetarias eran elípticas, no circulares.</li>
        <li><strong>Matemáticas:</strong> Al-Andalus fue fundamental en la introducción de los números arábigos y el concepto de cero en Europa, revolucionando el cálculo y allanando el camino para las matemáticas modernas.</li>
        <li><strong>Agricultura:</strong> Introdujeron nuevos cultivos como cítricos, caña de azúcar y arroz, junto con avanzadas técnicas de riego (acequias) que todavía se utilizan hoy.</li>
      </ul>

      <Card className="my-8 bg-secondary border-primary/20">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground m-0 p-0">
            El legado intelectual y cultural de Al-Andalus es un recordatorio del poder del intercambio intercultural y la búsqueda perdurable del conocimiento. Su influencia está profundamente entretejida en el tejido de la identidad española y europea.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
