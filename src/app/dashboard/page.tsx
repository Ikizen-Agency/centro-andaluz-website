'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventForm } from "@/components/dashboard/event-form";
import { PenaForm } from "@/components/dashboard/pena-form";
import { ArticleForm } from "@/components/dashboard/article-form";


export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Content Management</h1>
            <Tabs defaultValue="events">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="events">Add New Event</TabsTrigger>
                    <TabsTrigger value="penas">Add New Peña</TabsTrigger>
                    <TabsTrigger value="articles">Add New Article</TabsTrigger>
                </TabsList>
                <TabsContent value="events">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create a New Event</CardTitle>
                            <CardDescription>Fill out the form below to add a new event to the website.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EventForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="penas">
                     <Card>
                        <CardHeader>
                            <CardTitle>Create a New Peña</CardTitle>
                            <CardDescription>Fill out the form below to add a new peña cultural.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PenaForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="articles">
                     <Card>
                        <CardHeader>
                            <CardTitle>Create a New Blog Article</CardTitle>
                            <CardDescription>Fill out the form below to add a new article to the blog.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ArticleForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
