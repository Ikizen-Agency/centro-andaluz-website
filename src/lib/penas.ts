import type { Pena } from './types';
import { Music, BookOpen, Utensils, Brush, Film } from 'lucide-react';

export const penas: Pena[] = [
    {
        id: 'pena-flamenca',
        title: 'Peña Flamenca',
        day: 'Primer viernes de cada mes',
        description: 'Una noche dedicada al cante, baile y toque flamenco. Artistas locales e invitados especiales comparten su arte en un ambiente íntimo.',
        longDescription: 'Nuestra peña más antigua y concurrida. Es un espacio para la expresión pura del flamenco, donde se dan cita aficionados y profesionales. Cada sesión cuenta con un cuadro flamenco base y abre el escenario para participaciones espontáneas, manteniendo viva la esencia de esta tradición.',
        icon: Music,
    },
    {
        id: 'circulo-literario',
        title: 'Círculo Literario Andaluz',
        day: 'Segundo miércoles de cada mes',
        description: 'Un espacio para la lectura y el debate sobre la rica literatura andaluza, desde los clásicos como Lorca hasta autores contemporáneos.',
        longDescription: 'Analizamos una obra diferente cada mes, con presentaciones, lecturas dramatizadas y debates moderados. El objetivo es profundizar en las letras andaluzas y su contexto histórico y cultural. No se requiere lectura previa para asistir, ¡solo curiosidad!',
        icon: BookOpen,
    },
    {
        id: 'tertulia-gastronomica',
        title: 'Tertulia Gastronómica',
        day: 'Tercer jueves de cada mes',
        description: 'Una degustación y charla sobre un plato o producto emblemático de la cocina andaluza. Vinos, aceites, jamones y más.',
        longDescription: 'Cada tertulia se centra en una joya de la gastronomía de Andalucía. Un experto o cocinero invitado nos guía a través de la historia, la elaboración y, por supuesto, la degustación del producto. Es una experiencia sensorial para aprender y disfrutar con el paladar.',
        icon: Utensils,
    },
    {
        id: 'taller-de-artesania',
        title: 'Taller de Artesanía y Artes Plásticas',
        day: 'Cuarto sábado de cada mes',
        description: 'Un taller práctico para explorar técnicas artísticas andaluzas, como la cerámica, el esparto o la pintura de abanicos.',
        longDescription: 'Manos a la obra. Este taller rotativo invita a los participantes a crear su propia pieza de artesanía inspirada en las tradiciones andaluzas. Los materiales están incluidos y no se necesita experiencia previa, solo ganas de crear y compartir.',
        icon: Brush,
    },
    {
        id: 'cine-foro-andaluz',
        title: 'Cine-Foro Andaluz',
        day: 'Último martes de cada mes',
        description: 'Proyección de una película o documental relevante para la cultura andaluza, seguida de un coloquio y debate.',
        longDescription: 'Desde clásicos del cine español rodados en Andalucía hasta documentales sobre su historia o naturaleza. Tras la proyección, abrimos un espacio de diálogo para analizar la obra y los temas que aborda, conectando el séptimo arte con nuestra cultura.',
        icon: Film,
    }
]
