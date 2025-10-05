
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Feather, Utensils, Music, Users, Palette } from "lucide-react";
import { events } from "@/lib/events";
import { getPosts } from "@/lib/posts";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import PenasCarousel from "@/components/penas-carousel";

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
            className="object-cover object-top"
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
            Preservando y promoviendo el espíritu vibrante de la cultura andaluza en el corazón de La Habana.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/events">Explorar Eventos</Link>
          </Button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Próximos Eventos</h2>
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
              <Link href="/events">Ver Todos los Eventos <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Penas Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nuestras Peñas Culturales</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">Encuentros mensuales que celebran la riqueza de nuestra cultura. Únete a nosotros para vivir el flamenco, la literatura, la gastronomía y mucho más.</p>
          <PenasCarousel />
          <div className="text-center mt-12">
             <Button asChild>
                <Link href="/penas">Ver Todas las Peñas <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Culture Showcase */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">El Alma de Andalucía</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">Nos dedicamos a celebrar el rico tapiz de las tradiciones andaluzas, desde los ritmos apasionados del flamenco hasta los exquisitos sabores de su cocina.</p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                <Music className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Música y Baile</h3>
              <p className="text-muted-foreground">Experimenta la pasión del Flamenco, las Sevillanas y la guitarra clásica que resuenan en nuestros salones.</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                <Utensils className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gastronomía</h3>
              <p className="text-muted-foreground">Saborea los auténticos sabores de Andalucía con nuestros talleres culinarios y eventos de degustación.</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                <Feather className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Arte y Literatura</h3>
              <p className="text-muted-foreground">Explora el rico patrimonio literario y las expresiones artísticas de la tierra de poetas y pintores.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild>
                <Link href="/culture">Explorar Cultura <Palette className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Misión en La Habana</h2>
              <p className="text-muted-foreground mb-4">El Centro Andaluz de la Habana es un refugio cultural fundado por descendientes de inmigrantes andaluces en Cuba. Nuestra misión es ser una embajada viva de la cultura andaluza, preservando sus ricas tradiciones de música, danza, gastronomía y arte para las futuras generaciones.</p>
              <p className="text-muted-foreground mb-6">Funcionamos como un vibrante centro comunitario, fomentando un sentido de identidad y pertenencia entre los miembros, mientras damos la bienvenida a todos los que deseen experimentar la calidez y la pasión del sur de España.</p>
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">De Nuestro Blog</h2>
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
                      <p className="text-muted-foreground text-sm mb-2">Por {post.author} el {post.date}</p>
                      <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/blog">Leer Más Artículos <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
