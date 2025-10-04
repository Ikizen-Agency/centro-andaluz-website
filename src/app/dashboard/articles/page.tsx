
'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArticleForm } from "@/components/dashboard/article-form";
import { getPosts } from '@/lib/posts';
import type { Post } from '@/lib/types';
import { PlusCircle } from 'lucide-react';

export default function ArticlesPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        async function loadPosts() {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts);
        }
        loadPosts();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blog Articles</h1>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>Create a New Blog Article</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to add a new article to the blog.
                            </DialogDescription>
                        </DialogHeader>
                        <ArticleForm />
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Existing Articles</CardTitle>
                    <CardDescription>A list of all current blog articles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.slug}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.author}</TableCell>
                                    <TableCell>{post.date}</TableCell>
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
