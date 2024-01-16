'use client';

import { useStore } from '@nanostores/react';
import { useCallback } from 'react';
import {
  $basemapControl,
  setBasemap,
  setBasemapProviderName,
  setMapboxStyle,
} from '@/stores/basemap';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { basemapProviders } from './constants';

const BasemapControl = () => {
  const { basemap, mapboxStyle, basemapProviderName } = useStore($basemapControl);
  const handleStyleURLChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMapboxStyle({ ...mapboxStyle, styleURL: event.target.value });
    },
    [mapboxStyle]
  );
  const handleTokenChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMapboxStyle({ ...mapboxStyle, token: event.target.value });
    },
    [mapboxStyle]
  );

  return (
    <section className="space-y-2">
      <h2>Basemap</h2>
      <Select defaultValue={basemap} onValueChange={setBasemap}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Basemap" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default (Mapbox)</SelectItem>
          <SelectItem value="mapbox">External Mapbox</SelectItem>
          <SelectItem value="free">Free sources</SelectItem>
        </SelectContent>
      </Select>
      {basemap === 'mapbox' && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Mapbox Style URL"
            value={mapboxStyle?.styleURL || ''}
            onChange={handleStyleURLChange}
          />
          <Input
            type="text"
            placeholder="Mapbox Token"
            value={mapboxStyle?.token || ''}
            onChange={handleTokenChange}
          />
        </div>
      )}
      {basemap === 'free' && basemapProviderName && (
        <div className="space-y-2">
          <Select defaultValue={basemapProviderName} onValueChange={setBasemapProviderName}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choice a basemap provider" />
            </SelectTrigger>
            <SelectContent>
              {basemapProviders.map((provider) => (
                <SelectItem key={provider.name} value={provider.name}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </section>
  );
};

export default BasemapControl;
