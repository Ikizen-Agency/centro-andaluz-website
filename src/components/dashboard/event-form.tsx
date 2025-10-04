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

const eventFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100, "Title must be less than 100 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with dashes."),
  date: z.string().min(1, "Date is required."),
  location: z.string().min(1, "Location is required."),
  description: z.string().min(10, "Short description must be at least 10 characters.").max(160, "Short description must be less than 160 characters."),
  longDescription: z.string().min(20, "Long description must be at least 20 characters."),
  image: z.string().min(1, "Image ID is required."),
})

type EventFormValues = z.infer<typeof eventFormSchema>

export function EventForm() {
  const { toast } = useToast();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      date: "",
      location: "",
      description: "",
      longDescription: "",
      image: "",
    },
  })

  function onSubmit(data: EventFormValues) {
    console.log(data); // In a real app, you'd send this to a server
    toast({
      title: "Event Submitted",
      description: "The new event has been created (simulation).",
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
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Flamenco Night in Havana" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g. flamenco-night-havana" {...field} />
              </FormControl>
              <FormDescription>This is the URL-friendly version of the title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Saturday, August 10, 2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Grand Theatre of Havana" {...field} />
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
                <Textarea placeholder="A brief summary of the event for card views." {...field} />
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
                <Textarea placeholder="The detailed description for the event page." rows={5} {...field} />
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
        <Button type="submit">Create Event</Button>
      </form>
    </Form>
  )
}
