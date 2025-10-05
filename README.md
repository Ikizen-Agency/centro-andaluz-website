# Centro Andaluz Website — Supabase Setup

Proyecto Next.js con UI y autenticación usando Supabase.

## Requisitos

- Node.js 18+
- Cuenta y proyecto en Supabase

## Instalación

1. Instala dependencias:

```bash
npm install
```

2. Crea `.env.local` con:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Supabase

Autenticación por email/contraseña con `@supabase/supabase-js`.

Tablas sugeridas:

- events: id (uuid), slug (text unique), title (text), date (text), location (text), description (text), long_description (text), image (text), gallery (text[]), artists (jsonb)
- blog_posts: id (uuid), slug (text unique), title (text), description (text), author (text), date (text), image (text), content (text)
- penas: id (uuid), title (text), day (text), description (text), long_description (text), icon (text), image (text)

Configura RLS: lectura pública para contenido, escritura sólo para usuarios autenticados.
