
'use client';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Gestión de Contenido</h1>
            <p className="text-muted-foreground mb-8">Bienvenido al panel. Aquí puedes gestionar el contenido de tu sitio web.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Gestionar Eventos</CardTitle>
                        <CardDescription>Ver, añadir o editar eventos.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/events">Ir a Eventos <ArrowRight className="ml-2" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gestionar Peñas</CardTitle>
                        <CardDescription>Ver, añadir o editar peñas culturales.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/penas">Ir a Peñas <ArrowRight className="ml-2" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gestionar Artículos</CardTitle>
                        <CardDescription>Ver, añadir o editar artículos del blog.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/articles">Ir a Artículos <ArrowRight className="ml-2" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
