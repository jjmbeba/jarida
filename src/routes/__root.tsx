// src/routes/__root.tsx
/// <reference types="vite/client" />

import { ClerkProvider } from '@clerk/tanstack-react-start';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import Navbar from '@/components/common/navbar';
import { fetchClerkAuth } from '@/lib/auth';
import appCss from '@/styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth();

    return { userId };
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Jarida</title>
          <HeadContent />
        </head>
        <body>
          <Navbar />
          {children}
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
