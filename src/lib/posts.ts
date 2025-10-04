import type { Post, PostMeta } from './types';

interface PostModule {
  meta: PostMeta;
  default: React.ComponentType;
}

// This dynamic import map is a way to gather all posts without a complex file-system API.
// In a real-world scenario with many posts, this might be auto-generated.
const postImports: Record<string, () => Promise<PostModule>> = {
  'the-art-of-flamenco': () => import('@/content/blog/the-art-of-flamenco'),
  'a-taste-of-andalusia': () => import('@/content/blog/a-taste-of-andalusia'),
};

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    Object.entries(postImports).map(async ([slug, importFn]) => {
      const { meta, default: component } = await importFn();
      return {
        slug,
        ...meta,
        component,
      };
    })
  );
  // Sort posts by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const importFn = postImports[slug];
  if (!importFn) {
    return undefined;
  }
  const { meta, default: component } = await importFn();
  return {
    slug,
    ...meta,
    component,
  };
}
