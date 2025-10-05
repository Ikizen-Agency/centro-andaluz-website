import { getPosts } from '@/lib/posts.tsx'
import { events } from '@/lib/events'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Using a placeholder domain. In a real project, this would be an environment variable.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const staticRoutes = [
    '',
    '/events',
    '/members',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  const posts = await getPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes, ...postRoutes];
}
