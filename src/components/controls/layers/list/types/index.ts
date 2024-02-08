import { LayersPoints } from '@/components/controls/layers/list/types/points';
import { LayersPolygon } from '@/components/controls/layers/list/types/polygon';
import { LayersRaster } from '@/components/controls/layers/list/types/raster';
import { LayerProps, LayerType } from '@/components/controls/layers/types';

const LayersTypes: Record<LayerType['type'], (p: LayerProps) => JSX.Element> = {
  points: LayersPoints,
  polygon: LayersPolygon,
  raster: LayersRaster,
};

export default LayersTypes;
