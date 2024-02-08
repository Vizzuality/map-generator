'use client';

import { useAtom } from 'jotai';
import { Layer, Source } from 'react-map-gl';
import { $basemapControl } from '@/stores/basemap';
import { Map } from '@/components/map';
import { Controls } from '@/components/map/controls';
import { ZoomControl } from '@/components/map/controls/zoom';

import { LayerManager } from '@/containers/map/layer-manger';
import env from '@/env.mjs';

const MapContainer = () => {
  const [{ basemap, basemapMapbox, basemapCustom, basemapFreeProvider }] = useAtom($basemapControl);

  const isExternalMapbox = !!(
    basemap === 'custom' &&
    basemapCustom?.token &&
    basemapCustom?.styleURL
  );

  const MAPBOX_TOKEN = isExternalMapbox
    ? (basemapCustom.token as string)
    : env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const MAP_STYLE = isExternalMapbox
    ? (basemapCustom.styleURL as string)
    : `mapbox://styles/mapbox/${basemapMapbox}`;

  return (
    <Map
      key={MAPBOX_TOKEN}
      id="default"
      initialViewState={{ longitude: 0, latitude: 0, zoom: 0 }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={MAP_STYLE}
      preserveDrawingBuffer
    >
      <Controls className="absolute right-6 top-4">
        <ZoomControl />
      </Controls>

      {basemap === 'free' && basemapFreeProvider && (
        <Source
          id="thirdPartyBasemapSource"
          type="raster"
          tiles={[basemapFreeProvider.url]}
          tileSize={256}
        >
          <Layer id="thirdPartyBasemapLayer" type="raster" />
        </Source>
      )}

      <LayerManager />
    </Map>
  );
};

export default MapContainer;
