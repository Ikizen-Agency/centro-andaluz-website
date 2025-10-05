import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getPosts } from '@/lib/posts.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Blog | Centro Andaluz de la Habana',
  description: 'Artículos e historias sobre la cultura andaluza, su historia y nuestra comunidad en La Habana.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">De Nuestro Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Perspectivas, historias y reflexiones sobre la vibrante cultura de Andalucía y su hogar en La Habana.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const postImage = PlaceHolderImages.find(p => p.id === post.image);
            return (
              <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block flex flex-col h-full">
                  {postImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={postImage.imageUrl}
                        alt={postImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={postImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="!font-headline text-2xl">{post.title}</CardTitle>
                    <CardDescription>Por {post.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                  </CardContent>
                  <CardFooter>
                     <p className="text-sm text-muted-foreground">{post.date}</p>
                  </CardFooter>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
