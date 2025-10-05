
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface EventArtist {
  name: string;
  instrument: string;
}

export interface Event {
  id?: string; // Firestore ID
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  artists?: EventArtist[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  category: 'Junta Directiva' | 'Comisiones' | 'Colaboradores' | 'Colaboración Asociaciones';
}

export interface Post {
  id?: string; // Firestore ID
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  component?: ComponentType;
  content?: string; // Add content field for Firestore
  // This is a simplified representation. In a real MDX setup, this would be the compiled component.
}

export interface PostMeta extends Omit<Post, 'slug' | 'component' | 'id' | 'content'> {}


export interface Pena {
    id: string; // This will now be the Firestore document ID for penas
    title: string;
    day: string;
    description: string;
    longDescription: string;
    icon: LucideIcon | string; // Allow string for storing icon name
    image: string;
}
