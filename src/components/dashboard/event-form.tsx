
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"
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
import type { Event } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"


const eventFormSchema = z.object({
  title: z.string().min(2, "El título debe tener al menos 2 caracteres.").max(100, "El título debe tener menos de 100 caracteres."),
  slug: z.string().min(2, "El slug debe tener al menos 2 caracteres.").regex(/^[a-z0-9-]+$/, "El slug debe estar en minúsculas con guiones."),
  date: z.date({
    required_error: "La fecha es obligatoria.",
  }),
  location: z.string().min(1, "La ubicación es obligatoria."),
  description: z.string().min(10, "La descripción corta debe tener al menos 10 caracteres.").max(160, "La descripción corta debe tener menos de 160 caracteres."),
  longDescription: z.string().min(20, "La descripción larga debe tener al menos 20 caracteres."),
  image: z.any(),
})

type EventFormValues = z.infer<typeof eventFormSchema>

interface EventFormProps {
    initialData?: Event | null;
    onSave?: () => void;
    onCancel?: () => void;
}

const parseDate = (dateStr: string | Date): Date | undefined => {
  if (dateStr instanceof Date) return dateStr;
  if (typeof dateStr !== 'string') return undefined;
  
  // Handle Firestore Timestamp objects if they are serialized as objects
  if (typeof dateStr === 'object' && dateStr !== null && 'seconds' in dateStr) {
     // @ts-ignore
    return new Date(dateStr.seconds * 1000);
  }

  try {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

export function EventForm({ initialData, onSave, onCancel }: EventFormProps) {
  const { toast } = useToast();
  const isEditMode = !!initialData;
  const firestore = useFirestore();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      location: "",
      description: "",
      longDescription: "",
      image: "",
    },
  })

  useEffect(() => {
    if (isEditMode && initialData) {
      const initialDate = parseDate(initialData.date);
      form.reset({
        ...initialData,
        date: initialDate,
        image: "",
      });
    }
  }, [initialData, isEditMode, form]);

  async function onSubmit(data: EventFormValues) {
    const docId = isEditMode ? initialData!.id! : data.slug;
    const eventRef = doc(firestore, "events", docId);
    
    // In a real app, you would handle image uploads and get a URL.
    // For now, we'll just use a placeholder string.
    const imageUrl = `placeholder-for-${data.slug}`;

    const dataToSave = {
        ...data,
        date: format(data.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es }),
        image: isEditMode && !data.image ? initialData?.image : imageUrl,
    };
    // @ts-ignore
    delete dataToSave.image; // Don't save the file object

    setDoc(eventRef, dataToSave, { merge: isEditMode })
      .then(() => {
        toast({
          title: isEditMode ? "Evento Actualizado" : "Evento Creado",
          description: `El evento "${data.title}" ha sido ${isEditMode ? 'actualizado' : 'creado'} con éxito.`,
        });
        if (onSave) onSave();
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: eventRef.path,
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
                <Input placeholder="ej. noche-de-flamenco-habana" {...field} disabled={isEditMode} />
              </FormControl>
              <FormDescription>Esta es la versión del título amigable para URLs. No se puede cambiar después de la creación.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha del Evento</FormLabel>
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
                      date < new Date("1900-01-01")
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
              <FormLabel>Imagen del Evento</FormLabel>
              <FormControl>
                 <Input type="file" {...form.register("image")} />
              </FormControl>
               <FormDescription>Sube la imagen principal para el evento. {isEditMode && "Dejar en blanco para mantener la imagen actual."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
            {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>}
            <Button type="submit">{isEditMode ? 'Guardar Cambios' : 'Crear Evento'}</Button>
        </div>
      </form>
    </Form>
  )
}
