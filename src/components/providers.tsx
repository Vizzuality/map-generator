'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MapProvider } from 'react-map-gl';
import type { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <MapProvider>{children}</MapProvider>
  </QueryClientProvider>
);

export default Providers;
