import { ViewState } from 'react-map-gl';

export const DEFAULT_VIEW_STATE: Partial<ViewState> = {
  zoom: 2,
  latitude: 0,
  longitude: 0,
};

export const MAPBOX_BASEMAPS = [
  {
    id: 'standard',
    url: 'mapbox://styles/mapbox/standard',
  },
  {
    id: 'streets-v11',
    url: 'mapbox://styles/mapbox/streets-v11',
  },
  {
    id: 'outdoors-v11',
    url: 'mapbox://styles/mapbox/outdoors-v11',
  },
  {
    id: 'light-v10',
    url: 'mapbox://styles/mapbox/light-v10',
  },
  {
    id: 'dark-v10',
    url: 'mapbox://styles/mapbox/dark-v10',
  },
  {
    id: 'satellite-v9',
    url: 'mapbox://styles/mapbox/satellite-v9',
  },
  {
    id: 'satellite-streets-v11',
    url: 'mapbox://styles/mapbox/satellite-streets-v11',
  },
  {
    id: 'navigation-day-v1',
    url: 'mapbox://styles/mapbox/navigation-day-v1',
  },
  {
    id: 'navigation-night-v1',
    url: 'mapbox://styles/mapbox/navigation-night-v1',
  },
];
