import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Feather, Utensils, Music, Users, Palette } from "lucide-react";
import { events } from "@/lib/events";
import { getPosts } from "@/lib/posts";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(p => p.id === "hero");
const aboutImage = PlaceHolderImages.find(p => p.id === "about");

export default async function HomePage() {
  const latestPosts = (await getPosts()).slice(0, 2);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold !font-headline leading-tight tracking-tight">
            Centro Andaluz de la Habana
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Preserving and promoting the vibrant spirit of Andalusian culture in the heart of Havana.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/events">Explore Events</Link>
          </Button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => {
              const eventImage = PlaceHolderImages.find(p => p.id === event.image);
              return (
                <Card key={event.slug} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Link href={`/events/${event.slug}`} className="block">
                    {eventImage && (
                      <Image
                        src={eventImage.imageUrl}
                        alt={eventImage.description}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={eventImage.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="!font-headline text-xl">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <p className="text-muted-foreground line-clamp-2">{event.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/events">View All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Culture Showcase */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The Soul of Andalusia</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">We are dedicated to celebrating the rich tapestry of Andalusian traditions, from the passionate rhythms of flamenco to the exquisite flavors of its cuisine.</p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                <Music className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Music & Dance</h3>
              <p className="text-muted-foreground">Experience the passion of Flamenco, Sevillanas, and the classical guitar that echo through our halls.</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                <Utensils className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cuisine</h3>
              <p className="text-muted-foreground">Savor the authentic tastes of Andalusia with our culinary workshops and tasting events.</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                <Feather className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Art & Literature</h3>
              <p className="text-muted-foreground">Explore the rich literary heritage and artistic expressions from the land of poets and painters.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild>
                <Link href="/culture">Explore Culture <Palette className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission in Havana</h2>
              <p className="text-muted-foreground mb-4">The Centro Andaluz de la Habana is a cultural haven founded by descendants of Andalusian immigrants in Cuba. Our mission is to be a living embassy of Andalusian culture, preserving its rich traditions of music, dance, gastronomy, and art for future generations.</p>
              <p className="text-muted-foreground mb-6">We serve as a vibrant community hub, fostering a sense of identity and belonging among members while welcoming all who wish to experience the warmth and passion of Southern Spain.</p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">From Our Blog</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {latestPosts.map((post) => {
              const postImage = PlaceHolderImages.find(p => p.id === post.image);
              return (
                <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    {postImage && (
                      <Image
                        src={postImage.imageUrl}
                        alt={postImage.description}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={postImage.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="!font-headline text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm mb-2">By {post.author} on {post.date}</p>
                      <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/blog">Read More Articles <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
