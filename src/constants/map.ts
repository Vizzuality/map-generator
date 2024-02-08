import { ViewState } from 'react-map-gl';

export const DEFAULT_VIEW_STATE: Partial<ViewState> = {
  zoom: 2,
  latitude: 0,
  longitude: 0,
};

export const MAPBOX_BASEMAPS = [
  // {
  //   id: 'standard',
  //   name: 'standard',
  //   url: 'mapbox://styles/mapbox/standard',
  // }, Issues with deckgl
  {
    id: 'streets-v11',
    name: 'streets-v11',
    url: 'mapbox://styles/mapbox/streets-v11',
  },
  {
    id: 'outdoors-v11',
    name: 'outdoors-v11',
    url: 'mapbox://styles/mapbox/outdoors-v11',
  },
  {
    id: 'light-v10',
    name: 'light-v10',
    url: 'mapbox://styles/mapbox/light-v10',
  },
  {
    id: 'dark-v10',
    name: 'dark-v10',
    url: 'mapbox://styles/mapbox/dark-v10',
  },
  {
    id: 'satellite-v9',
    name: 'satellite-v9',
    url: 'mapbox://styles/mapbox/satellite-v9',
  },
  {
    id: 'satellite-streets-v11',
    name: 'satellite-streets-v11',
    url: 'mapbox://styles/mapbox/satellite-streets-v11',
  },
  {
    id: 'navigation-day-v1',
    name: 'navigation-day-v1',
    url: 'mapbox://styles/mapbox/navigation-day-v1',
  },
  {
    id: 'navigation-night-v1',
    name: 'navigation-night-v1',
    url: 'mapbox://styles/mapbox/navigation-night-v1',
  },
] as const;

export const FREE_BASEMAPS = [
  {
    name: 'OpenStreetMap',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  {
    name: 'Stadia Stamen WaterColor',
    url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16,
  },
  {
    name: 'CartoDB Voyager',
    url: 'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  {
    name: 'ESRI World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
] as const;
