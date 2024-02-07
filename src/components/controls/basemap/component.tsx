'use client';

import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { $basemap, $basemapMapbox, $basemapCustom, $basemapFree } from '@/stores/basemap';
import type {
  BasemapControl,
  BasemapFree,
  BasemapMapbox,
} from '@/components/controls/basemap/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FREE_BASEMAPS, MAPBOX_BASEMAPS } from '@/constants/map';

const BasemapControl = () => {
  const [basemap, setBasemap] = useAtom($basemap);
  const [basemapMapbox, setBasemapMapbox] = useAtom($basemapMapbox);
  const [basemapCustom, setBasemapCustom] = useAtom($basemapCustom);
  const [basemapFree, setBasemapFree] = useAtom($basemapFree);

  const handleStyleURLChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasemapCustom({ ...basemapCustom, styleURL: event.target.value });
    },
    [basemapCustom, setBasemapCustom]
  );

  const handleTokenChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasemapCustom({ ...basemapCustom, token: event.target.value });
    },
    [basemapCustom, setBasemapCustom]
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
          <SelectItem value="mapbox">Mapbox</SelectItem>
          <SelectItem value="custom">Custom Mapbox</SelectItem>
          <SelectItem value="free">Free sources</SelectItem>
        </SelectContent>
      </Select>

      {basemap === 'mapbox' && basemapMapbox && (
        <div className="space-y-2">
          <Select
            defaultValue={basemapMapbox}
            onValueChange={(v: BasemapMapbox) => setBasemapMapbox(v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choice a basemap theme" />
            </SelectTrigger>
            <SelectContent>
              {MAPBOX_BASEMAPS.map((b) => (
                <SelectItem key={b.name} value={b.name}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {basemap === 'custom' && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Mapbox Style URL"
            value={basemapCustom?.styleURL || ''}
            onChange={handleStyleURLChange}
          />
          <Input
            type="text"
            placeholder="Mapbox Token"
            value={basemapCustom?.token || ''}
            onChange={handleTokenChange}
          />
        </div>
      )}

      {basemap === 'free' && basemapFree && (
        <div className="space-y-2">
          <Select defaultValue={basemapFree} onValueChange={(v: BasemapFree) => setBasemapFree(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choice a basemap b" />
            </SelectTrigger>
            <SelectContent>
              {FREE_BASEMAPS.map((b) => (
                <SelectItem key={b.name} value={b.name}>
                  {b.name}
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
