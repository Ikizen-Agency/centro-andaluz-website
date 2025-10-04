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

const articleFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with dashes."),
  author: z.string().min(1, "Author is required."),
  date: z.string().min(1, "Date is required."),
  image: z.string().min(1, "Image ID is required."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(160, "Description must be less than 160 characters."),
  content: z.string().min(50, "Content must be at least 50 characters."),
})

type ArticleFormValues = z.infer<typeof articleFormSchema>

export function ArticleForm() {
  const { toast } = useToast();
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
  })

  function onSubmit(data: ArticleFormValues) {
    console.log(data); // In a real app, you'd send this to a server
    toast({
      title: "Article Submitted",
      description: `The new article "${data.title}" has been created (simulation).`,
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
              <FormLabel>Article Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. The Art of Flamenco" {...field} />
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
                <Input placeholder="e.g. the-art-of-flamenco" {...field} />
              </FormControl>
              <FormDescription>This will be the file name and URL for the article.</FormDescription>
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
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Isabella Reyes" {...field} />
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
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. July 22, 2024" {...field} />
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
              <FormLabel>Image ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g. blog-flamenco" {...field} />
              </FormControl>
              <FormDescription>The ID of the placeholder image to use for the article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description / Snippet</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary for blog list pages." {...field} />
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
              <FormLabel>Full Article Content (TSX)</FormLabel>
              <FormControl>
                <Textarea placeholder="Write the article content here. You can use TSX syntax." rows={15} {...field} />
              </FormControl>
              <FormDescription>This content will be rendered inside the blog post page. You can use divs, paragraphs, etc.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Article</Button>
      </form>
    </Form>
  )
}
