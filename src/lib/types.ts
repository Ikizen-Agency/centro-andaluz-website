import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface EventArtist {
  name: string;
  instrument: string;
}

export interface Event {
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
  id: number;
  name: string;
  role: string;
  category: 'Junta Directiva' | 'Comisiones' | 'Colaboradores' | 'Colaboración Asociaciones';
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  component: ComponentType;
  // This is a simplified representation. In a real MDX setup, this would be the compiled component.
}

export interface PostMeta extends Omit<Post, 'slug' | 'component'> {}

export interface Pena {
    id: string;
    title: string;
    day: string;
    description: string;
    longDescription: string;
    icon: LucideIcon;
    image: string;
}
