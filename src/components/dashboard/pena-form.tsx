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
  title: z.string().min(2, "El título debe tener al menos 2 caracteres."),
  id: z.string().min(2, "El ID debe tener al menos 2 caracteres.").regex(/^[a-z0-9-]+$/, "El ID debe estar en minúsculas con guiones."),
  day: z.string().min(1, "El día es obligatorio."),
  description: z.string().min(10, "La descripción corta debe tener al menos 10 caracteres.").max(160, "La descripción corta debe tener menos de 160 caracteres."),
  longDescription: z.string().min(20, "La descripción larga debe tener al menos 20 caracteres."),
  icon: z.string().min(1, "El nombre del icono de Lucide es obligatorio."),
  image: z.string().min(1, "El ID de la imagen es obligatorio."),
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
      title: "Peña Enviada",
      description: "La nueva peña ha sido creada (simulación).",
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
              <FormLabel>Título de la Peña</FormLabel>
              <FormControl>
                <Input placeholder="ej. Peña Flamenca" {...field} />
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
                <Input placeholder="ej. pena-flamenca" {...field} />
              </FormControl>
              <FormDescription>Este es el identificador único y el slug para la URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Día del Mes</FormLabel>
              <FormControl>
                <Input placeholder="ej. Primer viernes de cada mes" {...field} />
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
                <Textarea placeholder="Un breve resumen para las vistas de tarjeta." {...field} />
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
                <Textarea placeholder="La descripción detallada para la página de la peña." rows={5} {...field} />
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
              <FormLabel>Nombre del Icono</FormLabel>
              <FormControl>
                <Input placeholder="ej. Music, BookOpen (de lucide-react)" {...field} />
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
        <Button type="submit">Crear Peña</Button>
      </form>
    </Form>
  )
}
