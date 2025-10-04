
'use client';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Content Management</h1>
            <p className="text-muted-foreground mb-8">Welcome to the dashboard. Here you can manage the content of your website.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Events</CardTitle>
                        <CardDescription>View, add, or edit events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/events">Go to Events <ArrowRight className="ml-2" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Manage Peñas</CardTitle>
                        <CardDescription>View, add, or edit cultural peñas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/penas">Go to Peñas <ArrowRight className="ml-2" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Manage Articles</CardTitle>
                        <CardDescription>View, add, or edit blog articles.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/articles">Go to Articles <ArrowRight className="ml-2" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
