'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import basemapProviders from '@/constants/basemap-providers';

const BasemapControl = () => {
  const [basemap, setBasemap] = useState<string>('default');
  const [basemapProvider, setBasemapProvider] = useState<string>('OpenStreetMap');

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
          <Input type="text" placeholder="Mapbox Style URL" />
          <Input type="text" placeholder="Mapbox Token" />
        </div>
      )}
      {basemap === 'free' && (
        <div className="space-y-2">
          <Select defaultValue={basemapProvider} onValueChange={setBasemapProvider}>
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
