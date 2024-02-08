import { LAYER_TYPES } from '@/constants/layers';

export type Layer = {
  id: string | number;
  type: string;
};

export type LayerType = (typeof LAYER_TYPES)[number];
