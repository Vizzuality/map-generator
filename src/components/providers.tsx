'use client';

import { MapProvider } from 'react-map-gl';
import type { PropsWithChildren } from 'react';

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <MapProvider>{children}</MapProvider>
);

export default Providers;
