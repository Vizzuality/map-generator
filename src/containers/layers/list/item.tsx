'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { LucideChevronDown, Trash2 } from 'lucide-react';
import { createElement, useCallback, useState } from 'react';
import { $layers, $layersSettings } from '@/stores/layers';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import LayerTypes from '@/containers/layers/list/types';
import { LayerProps } from '@/containers/layers/types';
import { cn } from '@/lib/utils';

const LayersControlListItem = (props: LayerProps) => {
  const { id, name, type } = props;

  const [open, setOpen] = useState(true);

  const setLayers = useSetAtom($layers);
  const layerSettings = useAtomValue($layersSettings);

  const handleRemoveLayer = useCallback(() => {
    setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
  }, [id, setLayers]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div key={id} className="space-y-4 rounded border p-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <h2 className="uppercase">{name}</h2>

          <LucideChevronDown
            className={cn({
              'h-4 w-4': true,
              'rotate-180 transition-transform': open,
            })}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-4">
          {createElement(LayerTypes[type], {
            ...props,
            settings: layerSettings[id],
          })}

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleRemoveLayer}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </CollapsibleContent>
        {/* <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={LayerType.Vector}>Vector</SelectItem>
                    <SelectItem value={LayerType.Raster}>Raster</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SourceType.RandomPoints}>Random points</SelectItem>
                    <SelectItem value={SourceType.AdminAreas}>Admin areas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Aggregation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AggregationType.Sum}>Sum</SelectItem>
                    <SelectItem value={AggregationType.Mean}>Mean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Distribution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DistributionType.Quantile}>Quantile</SelectItem>
                    <SelectItem value={DistributionType.Percentile}>Percentile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-12 grid h-10 grid-cols-12 items-center gap-2 rounded-md border px-3 py-2">
                <label className="col-span-4">Opacity ({75})</label>
                <div className="col-span-8">
                  <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                </div>
              </div>
            </div> */}
      </div>
    </Collapsible>
  );
};

export default LayersControlListItem;
