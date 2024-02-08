import { type Getter, atom } from 'jotai';
import { FREE_BASEMAPS } from '@/constants/map';
import type { BasemapControl, BasemapFreeProvider } from '@/containers/basemap/types';

export const $basemap = atom<BasemapControl['basemap']>('mapbox');

export const $basemapMapbox = atom<BasemapControl['basemapMapbox']>('streets-v11');

export const $basemapCustom = atom<BasemapControl['basemapCustom']>({
  styleURL: null,
  token: null,
});

export const $basemapFree = atom<BasemapControl['basemapFree']>('OpenStreetMap');

export const $basemapControl = atom((get: Getter): BasemapControl => {
  const basemap = get($basemap);
  const basemapMapbox = get($basemapMapbox);
  const basemapCustom = get($basemapCustom);
  const basemapFree = get($basemapFree);

  return {
    basemap,
    basemapMapbox,
    basemapCustom,
    basemapFree,
    basemapFreeProvider: FREE_BASEMAPS.find(
      (basemapProvider) => basemapProvider.name === basemapFree
    ) as BasemapFreeProvider,
  };
});
