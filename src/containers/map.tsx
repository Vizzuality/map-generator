'use client';

import { useAtom } from 'jotai';
import { Layer, Source } from 'react-map-gl';
import { $basemapControl, $basemapProvider } from '@/stores/basemap';
import { Map } from '@/components/map';
import { Controls } from '@/components/map/controls';
import { ZoomControl } from '@/components/map/controls/zoom';

import env from '@/env.mjs';

const MapContainer = () => {
  const [{ basemap, mapboxStyle }] = useAtom($basemapControl);
  const [basemapProvider] = useAtom($basemapProvider);
  const isExternalMapbox = !!(basemap === 'mapbox' && mapboxStyle?.token && mapboxStyle?.styleURL);

  return (
    <Map
      id="default"
      initialViewState={{ longitude: 0, latitude: 0, zoom: 0 }}
      mapboxAccessToken={
        isExternalMapbox ? (mapboxStyle.token as string) : env.NEXT_PUBLIC_MAPBOX_TOKEN
      }
      mapStyle={
        isExternalMapbox ? (mapboxStyle.styleURL as string) : 'mapbox://styles/mapbox/streets-v11'
      }
      preserveDrawingBuffer
    >
      <Controls className="absolute right-6 top-4">
        <ZoomControl />
      </Controls>

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
    </Map>
  );
};

export default MapContainer;
