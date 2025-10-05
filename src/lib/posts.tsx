

import type { Post, PostMeta } from './types';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/server';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PostModule {
  meta: PostMeta;
  default: React.ComponentType;
}

// This dynamic import map is a way to gather all posts without a complex file-system API.
// In a real-world scenario with many posts, this might be auto-generated.
const postImports: Record<string, () => Promise<PostModule>> = {
  'the-art-of-flamenco': () => import('@/content/blog/the-art-of-flamenco'),
  'a-taste-of-andalusia': () => import('@/content/blog/a-taste-of-andalusia'),
  'alhambra-jewel-of-moorish-architecture': () => import('@/content/blog/alhambra-jewel-of-moorish-architecture'),
  'pueblos-blancos-journey-through-time': () => import('@/content/blog/pueblos-blancos-journey-through-time'),
  'legacy-of-al-andalus': () => import('@/content/blog/legacy-of-al-andalus'),
  'semana-santa-in-seville': () => import('@/content/blog/semana-santa-in-seville'),
  'sherry-liquid-gold-of-jerez': () => import('@/content/blog/sherry-liquid-gold-of-jerez'),
};


function createComponentFromContent(content: string) {
    return () => <MDXRemote source={content} />;
}


export async function getPosts(): Promise<Post[]> {
  // First, get posts from local files
  const localPostsPromises = Object.entries(postImports).map(async ([slug, importFn]) => {
      const { meta, default: component } = await importFn();
      return {
        slug,
        ...meta,
        component,
      };
    });

  const localPosts = await Promise.all(localPostsPromises);

  // Firestore removed: return local posts only
  return localPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post | undefined> {
  // First, try to get from local files
  const importFn = postImports[slug];
  if (importFn) {
    const { meta, default: component } = await importFn();
    return {
      slug,
      ...meta,
      component,
    };
  }

  // If not found locally, try Firestore
  try {
    const postRef = doc(firestore, 'blog_posts', slug);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const data = postSnap.data();
      return {
        id: postSnap.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        author: data.author,
        date: data.date,
        image: data.image,
        content: data.content,
        component: createComponentFromContent(data.content || ''),
      };
    }
  } catch (error) {
    console.error("Error fetching post from Firestore:", error);
    return undefined;
  }
  
  return undefined;
}
