'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { type SupabaseClient, getSupabaseBrowserClient } from './client';
import type { Session, User } from '@supabase/supabase-js';

type SupabaseContextValue = {
  client: SupabaseClient | null;
  user: User | null;
  session: Session | null;
  isUserLoading: boolean;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      return getSupabaseBrowserClient();
    } catch {
      // Env vars pueden faltar en build/prerender; evitamos throw aquí.
      return null;
    }
  }, []);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (!client) { setIsUserLoading(false); return; }
    let mounted = true;
    client.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setIsUserLoading(false);
    });

    const { data: sub } = client.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsUserLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [client]);

  const value = useMemo(() => ({ client, user, session, isUserLoading }), [client, user, session, isUserLoading]);
  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error('useSupabase must be used within SupabaseProvider');
  return ctx;
}

export function useSupabaseClient() {
  const { client } = useSupabase();
  if (typeof window === 'undefined') {
    // Durante SSR/prerender devolvemos un objeto vacío que no se usará (useEffect no corre).
    return {} as unknown as SupabaseClient;
  }
  if (!client) throw new Error('Supabase client no inicializado. Verifica tus variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  return client;
}

export function useSupabaseUser() {
  const { user, isUserLoading } = useSupabase();
  return { user, isUserLoading };
}

