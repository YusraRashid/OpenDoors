import { QueryClient } from '@tanstack/react-query';

// In-memory only. Never add a persister: Google place details must not be
// written to device storage (see CLAUDE.md).
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
