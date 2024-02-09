import chroma from 'chroma-js';
import { useAtom, useSetAtom } from 'jotai';
import { useId } from 'react';
import { useMap } from 'react-map-gl';
import { $layers, $layersCount } from '@/stores/layers';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  DEFAULT_CONFIG as POINTS_DEFAULT_CONFIG,
  DEFAULT_CONFIG_PARAMS as POINTS_DEFAULT_CONFIG_PARAMS,
  PointsConfigProps,
} from '@/containers/layers/list/types/points/generator';

import {
  DEFAULT_CONFIG as POLYGON_DEFAULT_CONFIG,
  DEFAULT_CONFIG_PARAMS as POLYGON_DEFAULT_CONFIG_PARAMS,
  PolygonConfigProps,
} from '@/containers/layers/list/types/polygon/generator';

import {
  DEFAULT_CONFIG as RASTER_DEFAULT_CONFIG,
  DEFAULT_CONFIG_PARAMS as RASTER_DEFAULT_CONFIG_PARAMS,
  RasterConfigProps,
} from '@/containers/layers/list/types/raster/generator';

import { LayerProps, LayerType, ParamsConfig } from '@/containers/layers/types';

const DEFAULT_CONFIGS: Record<
  LayerType['type'],
  (p: PointsConfigProps | PolygonConfigProps | RasterConfigProps) => Record<string, unknown>
> = {
  points: POINTS_DEFAULT_CONFIG,
  polygon: POLYGON_DEFAULT_CONFIG,
  raster: RASTER_DEFAULT_CONFIG,
};

const DEFAULT_CONFIGS_PARAMS: Record<LayerType['type'], ParamsConfig> = {
  points: POINTS_DEFAULT_CONFIG_PARAMS,
  polygon: POLYGON_DEFAULT_CONFIG_PARAMS,
  raster: RASTER_DEFAULT_CONFIG_PARAMS,
};

export const LayersAddListItem = ({ id, name, type }: LayerType) => {
  const uuid = useId();
  const { default: map } = useMap();
  const [layersCount, setLayersCount] = useAtom($layersCount);
  const setLayers = useSetAtom($layers);

  const handleAddLayer = () => {
    setLayers(
      (prevLayers) =>
        [
          {
            id: `${id}-${uuid}`,
            name: `${type}-${layersCount}`,
            type,
            config: DEFAULT_CONFIGS[type]({
              id: `${id}-${uuid}`,
              bbox: map!.getBounds().toArray().flat() as [number, number, number, number],
            }),
            params_config: DEFAULT_CONFIGS_PARAMS[type],
          },
          ...prevLayers,
        ] satisfies LayerProps[]
    );

    setLayersCount((prevCount) => prevCount + 1);
  };

  return (
    <DropdownMenuItem
      className="w-full cursor-pointer justify-center rounded-sm border border-gray-300 p-4 transition-colors hover:bg-gray-100"
      onClick={handleAddLayer}
    >
      {name}
    </DropdownMenuItem>
  );
};

export default LayersAddListItem;
