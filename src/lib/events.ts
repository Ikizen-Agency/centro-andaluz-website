
import type { Event } from './types';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/server';

// This file is kept for type reference but data fetching is now done client-side in the components.

const staticEvents: Event[] = [
  {
    id: 'noche-flamenca-en-la-habana',
    slug: 'noche-flamenca-en-la-habana',
    title: 'Noche Flamenca en La Habana',
    date: 'Sábado, 10 de agosto de 2024',
    location: 'Gran Teatro de La Habana',
    description: 'Una noche inolvidable de apasionada música y baile flamenco con artistas de renombre de Andalucía y Cuba.',
    longDescription: 'Sumérgete en la emoción cruda y los ritmos intrincados del flamenco. Esta velada especial reúne a bailaores y músicos galardonados para una actuación que tiende puentes entre las culturas del sur de España y el Caribe. Después del espectáculo habrá una recepción con vinos y tapas españolas.',
    image: 'event-flamenco',
    gallery: ['event-flamenco', 'event-sevillanas', 'blog-flamenco'],
    artists: [
      { name: 'Isabella Reyes', instrument: 'Bailaora Principal' },
      { name: 'Javier Gomez', instrument: 'Guitarrista' },
      { name: 'Elena Torres', instrument: 'Bailaora' },
    ],
  },
  {
    id: 'concierto-de-guitarra-andaluza',
    slug: 'concierto-de-guitarra-andaluza',
    title: 'Concierto de Guitarra Andaluza',
    date: 'Viernes, 6 de septiembre de 2024',
    location: 'Nuestro Centro Cultural',
    description: 'Una actuación en solitario del aclamado guitarrista, explorando la rica historia de la guitarra española.',
    longDescription: 'Acompáñanos en un íntimo concierto vespertino. El programa incluirá piezas de compositores clásicos, así como interpretaciones modernas de estándares del flamenco. Es una cita ineludible para los amantes de la música de cuerda y la cultura española.',
    image: 'event-guitar',
    gallery: ['event-guitar', 'hero', 'blog-alandalus-science'],
    artists: [
        { name: 'Javier Gomez', instrument: 'Guitarrista Solista' },
    ]
  },
  {
    id: 'taller-de-baile-por-sevillanas',
    slug: 'taller-de-baile-por-sevillanas',
    title: 'Taller de Baile por Sevillanas',
    date: 'Domingo, 22 de septiembre de 2024',
    location: 'Nuestro Centro Cultural',
    description: 'Aprende los conceptos básicos de las Sevillanas, el alegre y festivo baile de Sevilla. ¡Todos los niveles son bienvenidos!',
    longDescription: 'Ponte en pie y aprende las cuatro partes distintas de las Sevillanas. Nuestros instructores expertos te guiarán a través de los pasos en un ambiente divertido y de apoyo. No se necesita pareja ni experiencia previa. ¡Solo trae tu entusiasmo!',
    image: 'event-sevillanas',
    gallery: ['event-sevillanas', 'about', 'culture-sports'],
    artists: [
        { name: 'Elena Torres', instrument: 'Instructora' },
        { name: 'Sofia Moreno', instrument: 'Asistente' },
    ]
  },
  {
    id: 'degustacion-de-tapas-y-vinos',
    slug: 'degustacion-de-tapas-y-vinos',
    title: 'Degustación de Tapas y Vinos',
    date: 'Sábado, 12 de octubre de 2024',
    location: 'Terraza de la Azotea',
    description: 'Explora los sabores de Andalucía con una cuidada selección de tapas y vinos de la región.',
    longDescription: 'Haz un viaje culinario por Andalucía sin salir de La Habana. Nuestro chef presentará una variedad de tapas clásicas, desde jamón ibérico hasta gambas al ajillo, maridadas a la perfección con una selección de vinos tintos y blancos de la región. Disfruta de impresionantes vistas de la ciudad desde nuestra terraza.',
    image: 'event-tapas',
    gallery: ['event-tapas', 'blog-cuisine', 'blog-sherry-wine'],
    artists: [
        { name: 'Mateo Castillo', instrument: 'Anfitrión y Sumiller' },
    ]
  },
];

// Functions for getting data from Firestore were moved to be client-side hooks.
// These static functions can be used for fallback or initial data.
export async function getEvents(): Promise<Event[]> {
    try {
        const eventsCollection = collection(firestore, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const firestoreEvents: Event[] = eventsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                slug: data.slug,
                title: data.title,
                date: data.date,
                location: data.location,
                description: data.description,
                longDescription: data.longDescription,
                image: data.image,
                gallery: data.gallery,
                artists: data.artists
            };
        });
        return firestoreEvents;
    } catch (error) {
        console.warn("Could not fetch events from Firestore on the server. Falling back to static data. Error:", error);
        return staticEvents;
    }
}

export async function getEvent(slug: string): Promise<Event | undefined> {
    try {
        const eventRef = doc(firestore, 'events', slug);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
            const data = eventSnap.data();
            return {
                id: eventSnap.id,
                slug: data.slug,
                title: data.title,
                date: data.date,
                location: data.location,
                description: data.description,
                longDescription: data.longDescription,
                image: data.image,
                gallery: data.gallery,
                artists: data.artists
            };
        }
    } catch (error) {
         console.warn(`Could not fetch event "${slug}" from Firestore on the server. Falling back to static data. Error:`, error);
    }

    return staticEvents.find((e) => e.slug === slug);
}
