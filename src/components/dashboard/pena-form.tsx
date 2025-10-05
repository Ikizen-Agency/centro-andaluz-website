
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"
import { uploadPublicImage } from "@/supabase/storage"

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
import type { Pena } from "@/lib/types"
import { useSupabaseClient } from "@/supabase/provider"

const penaFormSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres."),
  day: z.string().min(1, "El día es obligatorio."),
  description: z.string().min(10, "La descripción corta debe tener al menos 10 caracteres.").max(160, "La descripción corta debe tener menos de 160 caracteres."),
  longDescription: z.string().min(20, "La descripción larga debe tener al menos 20 caracteres."),
  icon: z.string().min(1, "El nombre del icono de Lucide es obligatorio."),
  image: z.any(),
})

type PenaFormValues = z.infer<typeof penaFormSchema>

interface PenaFormProps {
    initialData?: Pena | null;
    onSave?: () => void;
    onCancel?: () => void;
}

export function PenaForm({ initialData, onSave, onCancel }: PenaFormProps) {
  const { toast } = useToast();
  const isEditMode = !!initialData;
  const supabase = useSupabaseClient();

  const form = useForm<PenaFormValues>({
    resolver: zodResolver(penaFormSchema),
    defaultValues: {
      title: "",
      day: "",
      description: "",
      longDescription: "",
      icon: "",
      image: "",
    },
  })

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        ...initialData,
        icon: typeof initialData.icon === 'string' ? initialData.icon : (initialData.icon.displayName || initialData.icon.name),
        image: "",
      });
    }
  }, [initialData, isEditMode, form]);

  async function onSubmit(data: PenaFormValues) {
    const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const id = isEditMode ? initialData!.id! : slug;
    let imagePublicUrl = initialData?.image || '';
    const imageFile = (data as any).image?.[0] as File | undefined;
    if (imageFile) {
      const { publicUrl, error } = await uploadPublicImage(supabase, { folder: 'penas', baseId: id, file: imageFile });
      if (error) {
        toast({ variant: 'destructive', title: 'Error subiendo imagen', description: error });
        return;
      }
      imagePublicUrl = publicUrl || imagePublicUrl;
    }

    const payload = {
      id,
      title: data.title,
      day: data.day,
      description: data.description,
      long_description: data.longDescription,
      icon: data.icon,
      image: imagePublicUrl,
    };

    const { error } = isEditMode
      ? await supabase.from('penas').update(payload).eq('id', id)
      : await supabase.from('penas').insert(payload);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar la peña.' });
      return;
    }

    toast({ title: isEditMode ? 'Peña Actualizada' : 'Peña Creada', description: `La peña "${data.title}" ha sido ${isEditMode ? 'actualizada' : 'creada'}.` });
    if (onSave) onSave();
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
              <FormDescription>Busca un icono en lucide-react.dev y pega su nombre aquí (ej. 'Music').</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen de la Peña</FormLabel>
              <FormControl>
                <Input type="file" {...form.register("image")} />
              </FormControl>
              <FormDescription>Sube la imagen principal para la peña. {isEditMode && "Dejar en blanco para mantener la imagen actual."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
            {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>}
            <Button type="submit">{isEditMode ? 'Guardar Cambios' : 'Crear Peña'}</Button>
        </div>
      </form>
    </Form>
  )
}
