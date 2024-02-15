import { ParamsConfig } from '@/containers/layers/types';

export type VectorConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id }: VectorConfigProps) => {
  return {
    id,
    '@@type': 'MVTLayer',
    data: 'https://tiles.globalforestwatch.org/wdpa_protected_areas/v202308/default/{z}/{x}/{y}.pbf',
    // Fill
    filled: '@@#params.filled',
    getFillColor: {
      '@@function': 'setColor',
      color: '@@#params.getFillColor',
      prop: 'gis_area',
      propFactor: 10000,
    },
    // Line
    stroked: '@@#params.stroked',
    lineWidthUnits: 'pixels',
    getLineColor: {
      '@@function': 'setColor',
      color: '@@#params.getLineColor',
    },
    getLineWidth: '@@#params.getLineWidth',
    updateTriggers: {
      getFillColor: '@@#params.getFillColor',
      getLineColor: '@@#params.getLineColor',
      getLineWidth: '@@#params.getLineWidth',
    },
  };
};

export const DEFAULT_CONFIG_PARAMS = [
  {
    type: 'boolean',
    key: 'filled',
    label: 'enabled',
    default: true,
    group: 'Fill',
  },
  {
    type: 'color',
    key: 'getFillColor',
    label: 'color',
    default: ['#3d7b1f'],
    group: 'Fill',
  },
  {
    type: 'boolean',
    key: 'stroked',
    label: 'enabled',
    default: true,
    group: 'Line',
  },
  {
    type: 'color',
    key: 'getLineColor',
    label: 'color',
    default: ['#000000'],
    group: 'Line',
  },
  {
    type: 'number',
    key: 'getLineWidth',
    label: 'width',
    default: 1,
    group: 'Line',
  },
];
