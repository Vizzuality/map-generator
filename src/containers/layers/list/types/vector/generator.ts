import { setPointData } from '@/lib/json-converter/functions';

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
    },
    // Line
    stroked: '@@#params.stroked',
    lineWidthUnits: 'pixels',
    getLineColor: {
      '@@function': 'setColor',
      color: '@@#params.getLineColor',
    },
    getLineWidth: '@@#params.getLineWidth',
  };
};

export const DEFAULT_CONFIG_PARAMS = [
  {
    type: 'boolean',
    key: 'filled',
    default: true,
  },
  {
    type: 'color',
    key: 'getFillColor',
    default: '#f97316',
  },
  {
    type: 'boolean',
    key: 'stroked',
    default: true,
  },
  {
    type: 'color',
    key: 'getLineColor',
    default: '#000000',
  },
  {
    type: 'number',
    key: 'getLineWidth',
    default: 1,
  },
];