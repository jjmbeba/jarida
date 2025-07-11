// src/router.tsx

import { ConvexQueryClient } from '@convex-dev/react-query';
import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

  if (!CONVEX_URL) {
    throw new Error('missing envar VITE_CONVEX_URL');
  }

  const convex = new ConvexReactClient(CONVEX_URL, {
    unsavedChangesWarning: false,
  })

  const convexQueryClient = new ConvexQueryClient(convex);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });

  convexQueryClient.connect(queryClient);

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: 'intent',
      context: { queryClient, convexClient: convex, convexQueryClient },
      scrollRestoration: true,
      Wrap: ({ children }) => (
        <ConvexProvider client={convexQueryClient.convexClient}>
          {children}
        </ConvexProvider>
      ),
    }),
    queryClient
  );

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
