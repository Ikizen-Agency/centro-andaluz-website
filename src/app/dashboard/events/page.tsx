
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { EventForm } from "@/components/dashboard/event-form";
import { events as initialEvents } from "@/lib/events";
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import { useState } from "react";
import type { Event } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function EventsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const { toast } = useToast();

    const handleDelete = (slug: string) => {
        setEvents(events.filter(e => e.slug !== slug));
        toast({
            title: "Evento Eliminado",
            description: "El evento ha sido eliminado con éxito (simulación)."
        });
    };
    
    const handleRowClick = (event: Event) => {
        setSelectedEvent(event);
        setIsDetailOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Eventos</h1>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nuevo Evento
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Crear un Nuevo Evento</DialogTitle>
                            <DialogDescription>
                                Completa el siguiente formulario para añadir un nuevo evento al sitio web.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto pr-4 -mr-4">
                            <EventForm />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Eventos Existentes</CardTitle>
                    <CardDescription>Una lista de todos los eventos actuales y futuros.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Ubicación</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.slug} onClick={() => handleRowClick(event)} className="cursor-pointer">
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell className="text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el evento.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(event.slug)}>
                                                        Eliminar
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
                    {selectedEvent && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedEvent.title}</DialogTitle>
                                <DialogDescription>{selectedEvent.date} - {selectedEvent.location}</DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-4">
                                <div>
                                    <h3 className="font-semibold">Descripción Corta</h3>
                                    <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                                </div>
                                 <div>
                                    <h3 className="font-semibold">Descripción Larga</h3>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedEvent.longDescription}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Slug</h3>
                                    <p className="text-sm text-muted-foreground">{selectedEvent.slug}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">ID de Imagen</h3>
                                    <p className="text-sm text-muted-foreground">{selectedEvent.image}</p>
                                </div>
                                 {selectedEvent.artists && selectedEvent.artists.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold">Artistas</h3>
                                        <ul className="text-sm text-muted-foreground list-disc pl-5">
                                            {selectedEvent.artists.map(artist => <li key={artist.name}>{artist.name} ({artist.instrument})</li>)}
                                        </ul>
                                    </div>
                                 )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
