'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { type SupabaseClient } from './client';
import { useSupabaseClient } from './provider';

type SelectOptions = {
  columns?: string;
  eq?: Array<{ column: string; value: any }>;
  order?: { column: string; ascending?: boolean; nullsFirst?: boolean };
  single?: boolean;
  keepPreviousData?: boolean;
};

export function useSupabaseSelect<T = any>(
  table: string | null | undefined,
  options: SelectOptions = {}
): { data: T[] | T | null; isLoading: boolean; error: Error | null; refetch: () => Promise<void> } {
  const client = useSupabaseClient();
  const { columns = '*', eq = [], order, single = false, keepPreviousData = true } = options;
  const [data, setData] = useState<T[] | T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasData, setHasData] = useState<boolean>(false);

  const run = useCallback(async (sb: SupabaseClient, tbl: string) => {
    setIsLoading(!(keepPreviousData && hasData));
    setError(null);
    try {
      let q = sb.from(tbl).select(columns);
      for (const cond of eq) {
        q = q.eq(cond.column, cond.value);
      }
      if (order) {
        q = q.order(order.column, { ascending: order.ascending ?? true, nullsFirst: order.nullsFirst ?? false });
      }
      const { data: rows, error: qErr } = single ? await q.single<T>() : await q.select<T>();
      if (qErr) throw qErr;
      setData(rows as any);
      setHasData(!!rows);
    } catch (e: any) {
      setError(e);
      if (!keepPreviousData) setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [columns, eq, order, single, keepPreviousData, hasData]);

  const refetch = useCallback(async () => {
    if (!table) return;
    await run(client, table);
  }, [client, run, table]);

  useEffect(() => {
    if (!table) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }
    run(client, table);
  }, [client, table, run]);

  return { data, isLoading, error, refetch };
}

export function useSupabaseBySlug<T = any>(
  table: string | null | undefined,
  slug: string | null | undefined,
  options: Omit<SelectOptions, 'eq' | 'single'> & { slugColumn?: string } = {}
) {
  const slugColumn = options.slugColumn ?? 'slug';
  return useSupabaseSelect<T>(table && slug ? table : null, { ...options, single: true, eq: [{ column: slugColumn, value: slug }] });
}

