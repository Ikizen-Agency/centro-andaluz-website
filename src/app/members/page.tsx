
import type { Metadata } from 'next';
import { members } from '@/lib/members';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Nuestros Miembros | Centro Andaluz de la Habana',
  description: 'Conoce a los dedicados miembros y al equipo de liderazgo del Centro Andaluz de la Habana.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 !font-headline text-primary">{title}</h2>
    {children}
    <Separator className="mt-16 w-1/2 mx-auto" />
  </section>
);

const MemberCard = ({ name, role, id }: { name: string; role: string, id: number }) => (
  <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-center">
    <CardContent className="p-0 flex flex-col items-center">
      <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
        <AvatarImage src={`https://picsum.photos/seed/${id}/200/200`} alt={`Foto de ${name}`} data-ai-hint="person portrait" />
        <AvatarFallback className="text-3xl bg-muted">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-bold !font-headline">{name}</h3>
      <p className="text-accent font-semibold text-sm">{role}</p>
    </CardContent>
  </Card>
);

export default function MembersPage() {
  const juntaDirectiva = members.filter(m => m.category === 'Junta Directiva');
  const comisiones = members.filter(m => m.category === 'Comisiones');
  const colaboradores = members.filter(m => m.category === 'Colaboradores');
  const asociaciones = members.filter(m => m.category === 'Colaboración Asociaciones');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Nuestros Miembros</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            El corazón de nuestro centro es su gente. Conoce a las personas dedicadas a preservar y compartir la cultura andaluza.
          </p>
        </div>
        
        <Section title="Junta Directiva">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {juntaDirectiva.map((member) => (
              <MemberCard key={member.id} name={member.name} role={member.role} id={member.id} />
            ))}
          </div>
        </Section>

        <Section title="Comisiones">
           <div className="flex justify-center">
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                {comisiones.map((member) => (
                <MemberCard key={member.id} name={member.name} role={member.role} id={member.id} />
                ))}
            </div>
          </div>
        </Section>

        <Section title="Colaboradores">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {colaboradores.map((member) => (
              <MemberCard key={member.id} name={member.name} role={member.role} id={member.id} />
            ))}
          </div>
        </Section>
        
        <section>
             <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 !font-headline text-primary">Colaboración de Asociaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {asociaciones.map((member) => (
                    <Card key={member.id} className="text-center p-6 shadow-lg">
                        <CardContent className="p-0">
                            <h3 className="text-lg font-bold !font-headline">{member.name}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
