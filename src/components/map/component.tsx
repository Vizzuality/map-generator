'use client';

import { useStore } from '@nanostores/react';
import MapGL, { Layer, Source } from 'react-map-gl';
import { $basemapControl, $basemapProvider } from '@/stores/basemap';
import { $contextualLayers } from '@/stores/contextual-layers';
import GainLayer from './layers/gain';
import ProtectedAreasLayer from './layers/protected-areas';

const Map = () => {
  const { basemap, mapboxStyle } = useStore($basemapControl);
  const contextualLayers = useStore($contextualLayers);
  const basemapProvider = useStore($basemapProvider);
  const isExternalMapbox = !!(basemap === 'mapbox' && mapboxStyle?.token && mapboxStyle?.styleURL);

  return (
    <MapGL
      id="previewMap"
      mapboxAccessToken={
        isExternalMapbox ? (mapboxStyle.token as string) : process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      }
      initialViewState={{ longitude: 0, latitude: 0, zoom: 0 }}
      mapStyle={
        isExternalMapbox ? (mapboxStyle.styleURL as string) : 'mapbox://styles/mapbox/streets-v11'
      }
      preserveDrawingBuffer
    >
      {basemap === 'free' && basemapProvider && (
        <Source
          id="thirdPartyBasemapSource"
          type="raster"
          tiles={[basemapProvider.url]}
          tileSize={256}
        >
          <Layer id="thirdPartyBasemapLayer" type="raster" />
        </Source>
      )}
      <GainLayer />
      {contextualLayers['protected-areas'] && <ProtectedAreasLayer />}
    </MapGL>
  );
};

export default Map;
