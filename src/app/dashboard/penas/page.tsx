
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [penas, setPenas] = useState<Pena[]>(initialPenas);
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        setPenas(penas.filter(p => p.id !== id));
        toast({
            title: "Peña Eliminada",
            description: "La peña cultural ha sido eliminada con éxito (simulación)."
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Peñas Culturales</h1>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                <TableRow key={pena.id}>
                                    <TableCell className="font-medium">{pena.title}</TableCell>
                                    <TableCell>{pena.day}</TableCell>
                                    <TableCell className="text-right space-x-2">
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
        </div>
    );
}
