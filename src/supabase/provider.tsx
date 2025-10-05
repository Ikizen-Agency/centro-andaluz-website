'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { type SupabaseClient, getSupabaseBrowserClient } from './client';
import type { Session, User } from '@supabase/supabase-js';

type SupabaseContextValue = {
  client: SupabaseClient;
  user: User | null;
  session: Session | null;
  isUserLoading: boolean;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
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
  return useSupabase().client;
}

export function useSupabaseUser() {
  const { user, isUserLoading } = useSupabase();
  return { user, isUserLoading };
}

