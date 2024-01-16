export type BasemapProvider = {
  name: string;
  url: string;
  attribution: string;
  maxZoom?: number;
};

export type MapboxStyleControl = { styleURL: string | null; token: string | null };

export type BasemapControl = {
  basemap: 'default' | 'mapbox' | 'free';
  mapboxStyle: MapboxStyleControl;
  basemapProviderName: BasemapProvider['name'];
};
