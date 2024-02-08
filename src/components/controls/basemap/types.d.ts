import { MAPBOX_BASEMAPS, FREE_BASEMAPS } from '@/constants/map';

export type BasemapMapbox = (typeof MAPBOX_BASEMAPS)[number]['name'];
export type BasemapCustom = { styleURL: string | null; token: string | null };
export type BasemapFree = (typeof FREE_BASEMAPS)[number]['name'];
export type BasemapFreeProvider = {
  name: string;
  url: string;
  attribution: string;
  maxZoom?: number;
};

export type BasemapControl = {
  basemap: 'mapbox' | 'custom' | 'free';
  basemapMapbox: BasemapMapbox;
  basemapCustom: BasemapCustom;
  basemapFree: BasemapFree;
  basemapFreeProvider: BasemapFreeProvider;
};
