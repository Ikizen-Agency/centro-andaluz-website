import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example of a disallowed path
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
