import type { ComponentType } from 'react';

export interface EventArtist {
  name: string;
  instrument: string;
  image: string;
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
  image: string;
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
