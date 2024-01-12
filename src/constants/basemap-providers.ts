// https://leaflet-extras.github.io/leaflet-providers/preview/

type BasemapProvider = {
  name: string;
  url: string;
  attribution: string;
  maxZoom?: number;
};

const basemapProviders: BasemapProvider[] = [
  {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  {
    name: 'OpenTopoMap',
    url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
    attribution:
      'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  },
  {
    name: 'ESRI World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
];

export default basemapProviders;
