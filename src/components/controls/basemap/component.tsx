'use client';

import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { $basemap, $basemapProviderName, $mapboxStyle } from '@/stores/basemap';
import type { BasemapControl, BasemapProvider } from '@/components/controls/basemap/types';
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
  const [basemap, setBasemap] = useAtom($basemap);
  const [mapboxStyle, setMapboxStyle] = useAtom($mapboxStyle);
  const [basemapProviderName, setBasemapProviderName] = useAtom($basemapProviderName);
  const handleStyleURLChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMapboxStyle({ ...mapboxStyle, styleURL: event.target.value });
    },
    [mapboxStyle, setMapboxStyle]
  );
  const handleTokenChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMapboxStyle({ ...mapboxStyle, token: event.target.value });
    },
    [mapboxStyle, setMapboxStyle]
  );

  return (
    <section className="space-y-2 py-4">
      <h2>Basemap</h2>
      <Select
        defaultValue={basemap}
        onValueChange={(value) => setBasemap(value as BasemapControl['basemap'])}
      >
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
