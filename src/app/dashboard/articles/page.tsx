
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArticleForm } from "@/components/dashboard/article-form";
import type { Post } from '@/lib/types';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";

export default function ArticlesPage() {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const { toast } = useToast();
    const firestore = useFirestore();

    const postsCollection = useMemoFirebase(() => collection(firestore, "blog_posts"), [firestore]);
    const { data: posts, isLoading } = useCollection<Post>(postsCollection);


    const handleDelete = async (slug: string) => {
        if (!slug) return;
        try {
            await deleteDoc(doc(firestore, "blog_posts", slug));
            toast({
                title: "Artículo Eliminado",
                description: "El artículo ha sido eliminado con éxito."
            });
        } catch (error) {
             console.error("Error deleting post:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar el artículo."
            });
        }
    };
    
    const handleEditClick = (post: Post) => {
        setSelectedPost(post);
        setIsEditFormOpen(true);
    };

    const handleRowClick = (post: Post) => {
        setSelectedPost(post);
        setIsDetailOpen(true);
    };

    const handleFormSuccess = () => {
        setIsCreateFormOpen(false);
        setIsEditFormOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Artículos del Blog</h1>
                 <Dialog open={isCreateFormOpen} onOpenChange={setIsCreateFormOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nuevo Artículo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Crear un Nuevo Artículo de Blog</DialogTitle>
                            <DialogDescription>
                                Completa el siguiente formulario para añadir un nuevo artículo al blog.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="overflow-y-auto pr-4 -mr-4 max-h-[70vh]">
                            <ArticleForm onSave={handleFormSuccess} />
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
                            {isLoading && <TableRow><TableCell colSpan={4}>Cargando artículos...</TableCell></TableRow>}
                            {posts && posts.map((post) => (
                                <TableRow key={post.slug} onClick={() => handleRowClick(post)} className="cursor-pointer">
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.author}</TableCell>
                                    <TableCell>{post.date}</TableCell>
                                    <TableCell className="text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="icon" onClick={() => handleEditClick(post)}>
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
                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el artículo.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(post.id!)}>
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
                    {selectedPost && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedPost.title}</DialogTitle>
                                <DialogDescription>Por {selectedPost.author} el {selectedPost.date}</DialogDescription>
                            </DialogHeader>
                            <div className="overflow-y-auto pr-4 -mr-4 space-y-4 max-h-[70vh]">
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
                                    <h3 className="font-semibold">Contenido (Markdown)</h3>
                                    <div className="mt-2 p-4 bg-secondary rounded-md text-sm text-muted-foreground prose">
                                       <pre className="whitespace-pre-wrap">{selectedPost.content}</pre>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

             <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Editar Artículo</DialogTitle>
                        <DialogDescription>
                           Modifica los datos del artículo. Haz clic en guardar cuando hayas terminado.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto pr-4 -mr-4 max-h-[70vh]">
                        <ArticleForm 
                            initialData={selectedPost} 
                            onSave={handleFormSuccess} 
                            onCancel={() => setIsEditFormOpen(false)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
