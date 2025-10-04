
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenaForm } from "@/components/dashboard/pena-form";
import { penas } from "@/lib/penas";
import { PlusCircle } from 'lucide-react';
import { useState } from "react";

export default function PenasPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Peñas Culturales</h1>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Peña
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>Create a New Peña</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to add a new peña cultural.
                            </DialogDescription>
                        </DialogHeader>
                        <PenaForm />
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Existing Peñas</CardTitle>
                    <CardDescription>A list of all monthly peñas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {penas.map((pena) => (
                                <TableRow key={pena.id}>
                                    <TableCell className="font-medium">{pena.title}</TableCell>
                                    <TableCell>{pena.day}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">Edit</Button>
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
