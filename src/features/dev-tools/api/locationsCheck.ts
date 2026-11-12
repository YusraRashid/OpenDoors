import { useQuery } from '@tanstack/react-query';

import { isSupabaseConfigured } from '@/lib/env';
import { supabase } from '@/lib/supabase';

// A small central London box, used only to prove the database connection.
const CHECK_BBOX = { min_lng: -0.14, min_lat: 51.49, max_lng: -0.08, max_lat: 51.53 };

export const locationsCheckKeys = {
  all: ['dev-tools', 'locations-check'] as const,
};

async function fetchLocationsCheck(): Promise<number> {
  const { data, error } = await supabase.rpc('locations_in_bbox', CHECK_BBOX);
  if (error) throw new Error(error.message);
  return Array.isArray(data) ? data.length : 0;
}

/** Counts rows returned by `locations_in_bbox`. Disabled when env is missing. */
export function useLocationsCheck() {
  return useQuery({
    queryKey: locationsCheckKeys.all,
    queryFn: fetchLocationsCheck,
    enabled: isSupabaseConfigured,
    retry: 0,
  });
}
