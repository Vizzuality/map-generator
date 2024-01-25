import { type Getter, atom } from 'jotai';
import { basemapProviders } from '@/components/controls/basemap/constants';
import type { BasemapControl, BasemapProvider } from '@/components/controls/basemap/types';

export const $basemap = atom<BasemapControl['basemap']>('default');

export const $mapboxStyle = atom<BasemapControl['mapboxStyle']>({ styleURL: null, token: null });

export const $basemapProviderName = atom<BasemapControl['basemapProviderName']>('OpenStreetMap');

export const $basemapControl = atom(
  (get: Getter): BasemapControl => ({
    basemap: get($basemap),
    mapboxStyle: get($mapboxStyle),
    basemapProviderName: get($basemapProviderName),
  })
);

export const $basemapProvider = atom((get: Getter): BasemapProvider | null => {
  const basemap = get($basemap);
  const basemapControl = get($basemapControl);
  return basemap === 'free'
    ? (basemapProviders.find(
        (basemapProvider) => basemapProvider.name === basemapControl.basemapProviderName
      ) as BasemapProvider)
    : null;
});
