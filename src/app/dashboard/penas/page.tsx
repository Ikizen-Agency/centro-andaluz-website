
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { PenaForm } from "@/components/dashboard/pena-form";
import { penas as initialPenas } from "@/lib/penas";
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from "react";
import type { Pena } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function PenasPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [penas, setPenas] = useState<Pena[]>(initialPenas);
    const [selectedPena, setSelectedPena] = useState<Pena | null>(null);
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        setPenas(penas.filter(p => p.id !== id));
        toast({
            title: "Peña Eliminada",
            description: "La peña cultural ha sido eliminada con éxito (simulación)."
        });
    };

    const handleRowClick = (pena: Pena) => {
        setSelectedPena(pena);
        setIsDetailOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Peñas Culturales</h1>
                 <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nueva Peña
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Crear una Nueva Peña</DialogTitle>
                            <DialogDescription>
                                Completa el siguiente formulario para añadir una nueva peña cultural.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto pr-4 -mr-4">
                            <PenaForm />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Peñas Existentes</CardTitle>
                    <CardDescription>Una lista de todas las peñas mensuales.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Día</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {penas.map((pena) => (
                                <TableRow key={pena.id} onClick={() => handleRowClick(pena)} className="cursor-pointer">
                                    <TableCell className="font-medium">{pena.title}</TableCell>
                                    <TableCell>{pena.day}</TableCell>
                                    <TableCell className="text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="sm">Editar</Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Estás absolutely seguro?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente la peña.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(pena.id)}>
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
                    {selectedPena && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedPena.title}</DialogTitle>
                                <DialogDescription>{selectedPena.day}</DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-4">
                                <div>
                                    <h3 className="font-semibold">Descripción Corta</h3>
                                    <p className="text-sm text-muted-foreground">{selectedPena.description}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Descripción Larga</h3>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedPena.longDescription}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">ID</h3>
                                    <p className="text-sm text-muted-foreground">{selectedPena.id}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">ID de Imagen</h3>
                                    <p className="text-sm text-muted-foreground">{selectedPena.image}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Icono</h3>
                                    <div className="flex items-center gap-2">
                                        <selectedPena.icon className="h-5 w-5 text-primary" />
                                        <p className="text-sm text-muted-foreground">{selectedPena.icon.displayName || selectedPena.icon.name}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
