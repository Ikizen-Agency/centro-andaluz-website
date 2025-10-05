
'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArticleForm } from "@/components/dashboard/article-form";
import { getPosts } from '@/lib/posts';
import type { Post } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ArticlesPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        async function loadPosts() {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts);
        }
        loadPosts();
    }, []);

    const handleDelete = (slug: string) => {
        // In a real app, you'd call an API to delete the post.
        // Here, we'll just simulate it by filtering the state.
        setPosts(posts.filter(p => p.slug !== slug));
        toast({
            title: "Artículo Eliminado",
            description: "El artículo ha sido eliminado con éxito (simulación)."
        });
    };

    const handleRowClick = (post: Post) => {
        setSelectedPost(post);
        setIsDetailOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Artículos del Blog</h1>
                 <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nuevo Artículo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Crear un Nuevo Artículo de Blog</DialogTitle>
                            <DialogDescription>
                                Completa el siguiente formulario para añadir un nuevo artículo al blog.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto pr-4 -mr-4">
                            <ArticleForm />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Artículos Existentes</CardTitle>
                    <CardDescription>Una lista de todos los artículos actuales del blog.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.slug} onClick={() => handleRowClick(post)} className="cursor-pointer">
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.author}</TableCell>
                                    <TableCell>{post.date}</TableCell>
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
                                                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el artículo.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(post.slug)}>
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
                    {selectedPost && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedPost.title}</DialogTitle>
                                <DialogDescription>Por {selectedPost.author} el {selectedPost.date}</DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-4">
                                <div>
                                    <h3 className="font-semibold">Descripción</h3>
                                    <p className="text-sm text-muted-foreground">{selectedPost.description}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Slug</h3>
                                    <p className="text-sm text-muted-foreground">{selectedPost.slug}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">ID de Imagen</h3>
                                    <p className="text-sm text-muted-foreground">{selectedPost.image}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Contenido (Componente)</h3>
                                    <div className="mt-2 p-4 bg-secondary rounded-md text-sm text-muted-foreground">
                                       El contenido completo es un componente de React y no se puede mostrar aquí directamente.
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
