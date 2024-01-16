import { atom, computed } from 'nanostores';
import { basemapProviders } from '@/components/controls/basemap/constants';
import type { BasemapControl } from '@/components/controls/basemap/types';

export const $basemap = atom<BasemapControl['basemap']>('default');

export const $mapboxStyle = atom<BasemapControl['mapboxStyle']>({ styleURL: null, token: null });

export const $basemapProviderName = atom<BasemapControl['basemapProviderName']>('OpenStreetMap');

export const $basemapControl = computed(
  [$basemap, $mapboxStyle, $basemapProviderName],
  (basemap, mapboxStyle, basemapProviderName) => ({
    basemap,
    mapboxStyle,
    basemapProviderName,
  })
);

export const $basemapProvider = computed([$basemap, $basemapControl], (basemap, basemapControl) =>
  basemap === 'free'
    ? basemapProviders.find(
        (basemapProvider) => basemapProvider.name === basemapControl.basemapProviderName
      )
    : null
);

export function setBasemap(basemap: BasemapControl['basemap']) {
  $basemap.set(basemap);
}

export function setMapboxStyle(mapboxStyle: BasemapControl['mapboxStyle']) {
  $mapboxStyle.set(mapboxStyle);
}

export function setBasemapProviderName(providerName: BasemapControl['basemapProviderName']) {
  $basemapProviderName.set(providerName);
}
