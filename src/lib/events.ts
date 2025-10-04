import type { Event } from './types';

export const events: Event[] = [
  {
    slug: 'flamenco-night-in-havana',
    title: 'Flamenco Night in Havana',
    date: 'Saturday, August 10, 2024',
    location: 'Grand Theatre of Havana',
    description: 'An unforgettable night of passionate flamenco music and dance featuring renowned artists from Andalusia and Cuba.',
    longDescription: 'Immerse yourself in the raw emotion and intricate rhythms of flamenco. This special evening brings together award-winning dancers and musicians for a performance that bridges the cultures of Southern Spain and the Caribbean. A reception with Spanish wines and tapas will follow the show.',
    image: 'event-flamenco',
    gallery: ['event-flamenco', 'event-sevillanas', 'blog-flamenco'],
  },
  {
    slug: 'andalusian-guitar-concert',
    title: 'Andalusian Guitar Concert',
    date: 'Friday, September 6, 2024',
    location: 'Our Cultural Center',
    description: 'A solo performance by maestro aclaimed guitarist, exploring the rich history of the Spanish guitar.',
    longDescription: 'Join us for an intimate evening concert. The program will feature pieces by classical composers as well as modern interpretations of flamenco standards. This is a must-see for lovers of string music and Spanish culture.',
    image: 'event-guitar',
    gallery: ['event-guitar', 'hero', 'blog-alandalus-science'],
  },
  {
    slug: 'sevillanas-dance-workshop',
    title: 'Sevillanas Dance Workshop',
    date: 'Sunday, September 22, 2024',
    location: 'Our Cultural Center',
    description: 'Learn the basics of Sevillanas, the joyful and festive dance of Seville. All levels are welcome!',
    longDescription: 'Get on your feet and learn the four distinct parts of the Sevillanas. Our expert instructors will guide you through the steps in a fun and supportive environment. No partner or prior experience is necessary. Just bring your enthusiasm!',
    image: 'event-sevillanas',
    gallery: ['event-sevillanas', 'about', 'culture-sports'],
  },
  {
    slug: 'tapas-and-wine-tasting',
    title: 'Tapas & Wine Tasting',
    date: 'Saturday, October 12, 2024',
    location: 'Rooftop Terrace',
    description: 'Explore the flavors of Andalusia with a curated selection of tapas and regional wines.',
    longDescription: 'Take a culinary journey through Andalusia without leaving Havana. Our chef will present a variety of classic tapas, from jamón ibérico to gambas al ajillo, perfectly paired with a selection of red and white wines from the region. Enjoy stunning city views from our rooftop terrace.',
    image: 'event-tapas',
    gallery: ['event-tapas', 'blog-cuisine', 'blog-sherry-wine'],
  },
];
