"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react";

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
import type { Post } from "@/lib/types";

const articleFormSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres."),
  slug: z.string().min(2, "El slug debe tener al menos 2 caracteres.").regex(/^[a-z0-9-]+$/, "El slug debe estar en minúsculas y con guiones."),
  author: z.string().min(1, "El autor es obligatorio."),
  date: z.string().min(1, "La fecha es obligatoria."),
  image: z.any(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres.").max(160, "La descripción debe tener menos de 160 caracteres."),
  content: z.string().min(50, "El contenido debe tener al menos 50 caracteres."),
})

type ArticleFormValues = z.infer<typeof articleFormSchema>

interface ArticleFormProps {
    initialData?: Post | null;
    onSave?: () => void;
    onCancel?: () => void;
}

export function ArticleForm({ initialData, onSave, onCancel }: ArticleFormProps) {
  const { toast } = useToast();
  const isEditMode = !!initialData;

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
      date: "",
      image: "",
      description: "",
      content: "",
    },
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        title: initialData.title,
        slug: initialData.slug,
        author: initialData.author,
        date: initialData.date,
        description: initialData.description,
        content: "El contenido es un componente React y no se puede editar aquí.",
        image: initialData.image,
      });
    }
  }, [initialData, isEditMode, form]);

  function onSubmit(data: ArticleFormValues) {
    console.log(data); // In a real app, you'd send this to a server
    toast({
      title: isEditMode ? "Artículo Actualizado" : "Artículo Creado",
      description: `El artículo "${data.title}" ha sido ${isEditMode ? 'actualizado' : 'creado'} (simulación).`,
    })
    
    if (onSave) {
        onSave();
    } else {
        form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del Artículo</FormLabel>
              <FormControl>
                <Input placeholder="ej. El Arte del Flamenco" {...field} />
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
                <Input placeholder="ej. el-arte-del-flamenco" {...field} disabled={isEditMode} />
              </FormControl>
              <FormDescription>Este será el nombre del archivo y la URL del artículo. No se puede cambiar después de la creación.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor</FormLabel>
                <FormControl>
                  <Input placeholder="ej. Isabella Reyes" {...field} />
                </FormControl>
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
                  <Input placeholder="ej. 22 de julio de 2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen del Artículo</FormLabel>
              <FormControl>
                <Input type="file" {...form.register("image")} />
              </FormControl>
              <FormDescription>Sube la imagen principal para el artículo. {isEditMode && "Dejar en blanco para mantener la imagen actual."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción Corta / Fragmento</FormLabel>
              <FormControl>
                <Textarea placeholder="Un breve resumen para las páginas de lista del blog." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido Completo del Artículo (TSX)</FormLabel>
              <FormControl>
                <Textarea placeholder="Escribe el contenido del artículo aquí. Puedes usar sintaxis TSX." rows={15} {...field} disabled={isEditMode}/>
              </FormControl>
              <FormDescription>Este contenido se renderizará dentro de la página del post del blog. No se puede editar después de la creación.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
            {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>}
            <Button type="submit">{isEditMode ? 'Guardar Cambios' : 'Crear Artículo'}</Button>
        </div>
      </form>
    </Form>
  )
}
