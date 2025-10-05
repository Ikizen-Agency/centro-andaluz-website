
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { EventForm } from "@/components/dashboard/event-form";
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import { useState, useMemo } from "react";
import type { Event } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";

export default function EventsPage() {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const { toast } = useToast();
    const firestore = useFirestore();

    const eventsCollection = useMemoFirebase(() => collection(firestore, "events"), [firestore]);
    const { data: events, isLoading } = useCollection<Event>(eventsCollection);

    const handleDelete = async (id: string) => {
        if (!id) return;
        const eventRef = doc(firestore, "events", id);
        deleteDoc(eventRef)
          .then(() => {
            toast({
              title: "Evento Eliminado",
              description: "El evento ha sido eliminado con éxito.",
            });
          })
          .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
              path: eventRef.path,
              operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
          });
    };
    
    const handleEditClick = (event: Event) => {
        setSelectedEvent(event);
        setIsEditFormOpen(true);
    };

    const handleRowClick = (event: Event) => {
        setSelectedEvent(event);
        setIsDetailOpen(true);
    };

    const handleFormSuccess = () => {
        setIsCreateFormOpen(false);
        setIsEditFormOpen(false);
        // Data will refetch automatically thanks to useCollection
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Eventos</h1>
                <Dialog open={isCreateFormOpen} onOpenChange={setIsCreateFormOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nuevo Evento
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Crear un Nuevo Evento</DialogTitle>
                            <DialogDescription>
                                Completa el siguiente formulario para añadir un nuevo evento al sitio web.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="overflow-y-auto pr-4 -mr-4 max-h-[70vh]">
                            <EventForm onSave={handleFormSuccess} />
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
                            {isLoading && <TableRow><TableCell colSpan={4}>Cargando eventos...</TableCell></TableRow>}
                            {events && events.map((event) => (
                                <TableRow key={event.slug} onClick={() => handleRowClick(event)} className="cursor-pointer">
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell className="text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="icon" onClick={() => handleEditClick(event)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="icon">
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
                                                    <AlertDialogAction onClick={() => handleDelete(event.id!)}>
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
                <DialogContent className="sm:max-w-3xl">
                    {selectedEvent && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedEvent.title}</DialogTitle>
                                <DialogDescription>{selectedEvent.date} - {selectedEvent.location}</DialogDescription>
                            </DialogHeader>
                            <div className="overflow-y-auto pr-4 -mr-4 space-y-4 max-h-[70vh]">
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

             <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Editar Evento</DialogTitle>
                        <DialogDescription>
                           Modifica los datos del evento. Haz clic en guardar cuando hayas terminado.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto pr-4 -mr-4 max-h-[70vh]">
                        <EventForm 
                            initialData={selectedEvent} 
                            onSave={handleFormSuccess} 
                            onCancel={() => setIsEditFormOpen(false)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
