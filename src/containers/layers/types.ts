import { LAYER_TYPES } from '@/constants/layers';

export type LayerProps = {
  id: string | number;
  type: LayerType['type'];
  name: string;
  config: Record<string, unknown>;
  params_config: ParamsConfig;
  settings?: Record<string, unknown>;
};

export type LayerType = (typeof LAYER_TYPES)[number];

export type ParamsConfigValue = {
  key: string;
  default: unknown;
};

export type ParamsConfig = ParamsConfigValue[];
