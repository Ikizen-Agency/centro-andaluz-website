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
  title: z.string().min(2, "El título debe tener al menos 2 caracteres.").max(100, "El título debe tener menos de 100 caracteres."),
  slug: z.string().min(2, "El slug debe tener al menos 2 caracteres.").regex(/^[a-z0-9-]+$/, "El slug debe estar en minúsculas con guiones."),
  date: z.string().min(1, "La fecha es obligatoria."),
  location: z.string().min(1, "La ubicación es obligatoria."),
  description: z.string().min(10, "La descripción corta debe tener al menos 10 caracteres.").max(160, "La descripción corta debe tener menos de 160 caracteres."),
  longDescription: z.string().min(20, "La descripción larga debe tener al menos 20 caracteres."),
  image: z.string().min(1, "El ID de la imagen es obligatorio."),
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
      title: "Evento Enviado",
      description: "El nuevo evento ha sido creado (simulación).",
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
              <FormLabel>Título del Evento</FormLabel>
              <FormControl>
                <Input placeholder="ej. Noche de Flamenco en La Habana" {...field} />
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
                <Input placeholder="ej. noche-de-flamenco-habana" {...field} />
              </FormControl>
              <FormDescription>Esta es la versión del título amigable para URLs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input placeholder="ej. Sábado, 10 de agosto de 2024" {...field} />
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
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input placeholder="ej. Gran Teatro de La Habana" {...field} />
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
              <FormLabel>Descripción Corta</FormLabel>
              <FormControl>
                <Textarea placeholder="Un breve resumen del evento para las vistas de tarjeta." {...field} />
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
              <FormLabel>Descripción Completa</FormLabel>
              <FormControl>
                <Textarea placeholder="La descripción detallada para la página del evento." rows={5} {...field} />
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
              <FormLabel>ID de Imagen</FormLabel>
              <FormControl>
                <Input placeholder="ej. event-flamenco" {...field} />
              </FormControl>
               <FormDescription>El ID de la imagen de marcador de posición a usar.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear Evento</Button>
      </form>
    </Form>
  )
}
