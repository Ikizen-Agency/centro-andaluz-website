
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react";
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"


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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const articleFormSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres."),
  slug: z.string().min(2, "El slug debe tener al menos 2 caracteres.").regex(/^[a-z0-9-]+$/, "El slug debe estar en minúsculas y con guiones."),
  author: z.string().min(1, "El autor es obligatorio."),
  date: z.date({
    required_error: "La fecha es obligatoria.",
  }),
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

const parseDate = (dateStr: string | Date): Date | undefined => {
  if (dateStr instanceof Date) return dateStr;
  if (typeof dateStr !== 'string') return undefined;
  try {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

export function ArticleForm({ initialData, onSave, onCancel }: ArticleFormProps) {
  const { toast } = useToast();
  const isEditMode = !!initialData;
  const firestore = useFirestore();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
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
        date: parseDate(initialData.date),
        description: initialData.description,
        content: initialData.content || "El contenido es un componente React y no se puede editar aquí.",
        image: initialData.image,
      });
    }
  }, [initialData, isEditMode, form]);

  async function onSubmit(data: ArticleFormValues) {
    const docId = isEditMode ? initialData!.id! : data.slug;
    const postRef = doc(firestore, "blog_posts", docId);
    
    const imageUrl = `placeholder-for-${data.slug}`;

    const dataToSave = {
        ...data,
        date: format(data.date, "d 'de' MMMM 'de' yyyy", { locale: es }),
        image: isEditMode && !data.image ? initialData?.image : imageUrl,
    };
    // @ts-ignore
    delete dataToSave.image; 

    setDoc(postRef, dataToSave, { merge: isEditMode })
      .then(() => {
        toast({
          title: isEditMode ? "Artículo Actualizado" : "Artículo Creado",
          description: `El artículo "${data.title}" ha sido ${isEditMode ? 'actualizado' : 'creado'}.`,
        });
        if (onSave) {
            onSave();
        }
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: postRef.path,
          operation: isEditMode ? 'update' : 'create',
          requestResourceData: dataToSave,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
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
                <FormItem className="flex flex-col">
                <FormLabel>Fecha de Publicación</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP", { locale: es })
                        ) : (
                            <span>Elige una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={es}
                    />
                    </PopoverContent>
                </Popover>
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
              <FormLabel>Contenido Completo del Artículo (Markdown)</FormLabel>
              <FormControl>
                <Textarea placeholder="Escribe el contenido del artículo aquí. Puedes usar sintaxis Markdown." rows={15} {...field} />
              </FormControl>
              <FormDescription>Este contenido se renderizará dentro de la página del post del blog.</FormDescription>
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
