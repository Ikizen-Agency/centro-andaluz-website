"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const penaFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  id: z.string().min(2, "ID must be at least 2 characters.").regex(/^[a-z0-9-]+$/, "ID must be lowercase with dashes."),
  day: z.string().min(1, "Day is required."),
  description: z.string().min(10, "Short description must be at least 10 characters.").max(160, "Short description must be less than 160 characters."),
  longDescription: z.string().min(20, "Long description must be at least 20 characters."),
  icon: z.string().min(1, "Lucide icon name is required."),
  image: z.string().min(1, "Image ID is required."),
})

type PenaFormValues = z.infer<typeof penaFormSchema>

export function PenaForm() {
  const { toast } = useToast();
  const form = useForm<PenaFormValues>({
    resolver: zodResolver(penaFormSchema),
    defaultValues: {
      title: "",
      id: "",
      day: "",
      description: "",
      longDescription: "",
      icon: "",
      image: "",
    },
  })

  function onSubmit(data: PenaFormValues) {
    console.log(data); // In a real app, you'd send this to a server
    toast({
      title: "Peña Submitted",
      description: "The new peña has been created (simulation).",
    })
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peña Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Peña Flamenca" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g. pena-flamenca" {...field} />
              </FormControl>
              <FormDescription>This is the unique identifier and URL slug.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day of the Month</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Primer viernes de cada mes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary for card views." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea placeholder="The detailed description for the peña page." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Music, BookOpen (from lucide-react)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g. event-flamenco" {...field} />
              </FormControl>
              <FormDescription>The ID of the placeholder image to use.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Peña</Button>
      </form>
    </Form>
  )
}
