import { LayersPoints } from '@/containers/layers/list/types/points';
import { LayersPolygon } from '@/containers/layers/list/types/polygon';
import { LayersRaster } from '@/containers/layers/list/types/raster';
import { LayerProps, LayerType } from '@/containers/layers/types';

const LayersTypes: Record<LayerType['type'], (p: LayerProps) => JSX.Element> = {
  points: LayersPoints,
  polygon: LayersPolygon,
  raster: LayersRaster,
};

export default LayersTypes;
