import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPost, getPosts } from '@/lib/posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { members } from '@/lib/members';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Artículo no Encontrado',
    };
  }

  return {
    title: `${post.title} | Blog del Centro Andaluz`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const PostContent = post.component;
  const postImage = PlaceHolderImages.find((p) => p.id === post.image);
  const authorInfo = members.find(m => m.name === post.author);
  const authorImage = authorInfo ? PlaceHolderImages.find(p => p.id === authorInfo.image) : null;


  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <article>
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold !font-headline mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-muted-foreground">
               {authorInfo && (
                <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        {authorImage && <AvatarImage src={authorImage.imageUrl} alt={authorInfo.name} data-ai-hint={authorImage.imageHint} />}
                        <AvatarFallback>{authorInfo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                </div>
               )}
              <span className="hidden md:inline-block">•</span>
              <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
            </div>
          </header>

          {postImage && (
            <div className="relative h-64 md:h-96 w-full mb-12 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={postImage.imageUrl}
                alt={postImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={postImage.imageHint}
              />
            </div>
          )}

          <div className="prose prose-lg lg:prose-xl max-w-none mx-auto text-foreground/90 prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
            <PostContent />
          </div>
        </article>
      </div>
    </div>
  );
}
