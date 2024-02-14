import { LayersPoints } from '@/containers/layers/list/types/points';
import { LayersPolygon } from '@/containers/layers/list/types/polygon';
import { LayersRaster } from '@/containers/layers/list/types/raster';
import { LayersVector } from '@/containers/layers/list/types/vector';
import { LayerProps, LayerType } from '@/containers/layers/types';

const LayersTypes: Record<LayerType['type'], (p: LayerProps) => JSX.Element> = {
  points: LayersPoints,
  polygon: LayersPolygon,
  raster: LayersRaster,
  vector: LayersVector,
};

export default LayersTypes;
