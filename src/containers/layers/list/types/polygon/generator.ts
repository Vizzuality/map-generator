export type PolygonConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id, bbox }: PolygonConfigProps) => {
  return {
    id,
    '@@type': 'GeoJsonLayer',
    data: {
      '@@function': 'setPolygonsData',
      count: '@@#params.count',
      vertices: '@@#params.vertices',
      bbox,
    },
    dataComparator: {
      '@@function': 'setPolygonsDataComparator',
      count: '@@#params.count',
      vertices: '@@#params.vertices',
    },
    dataTransform: (data: unknown[]) => {
      return data.map((d: any) => {
        return {
          ...d,
          properties: {
            value: Math.random(),
          },
        };
      });
    },
    getPosition: '@@=geometry.coordinates',
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
    updateTriggers: {
      getFillColor: '@@#params.getFillColor',
      getLineColor: '@@#params.getLineColor',
      getLineWidth: '@@#params.getLineWidth',
    },
  };
};

export const DEFAULT_CONFIG_PARAMS = [
  {
    type: 'number',
    key: 'count',
    default: 5,
  },
  {
    type: 'number',
    key: 'vertices',
    default: 5,
  },
  {
    type: 'boolean',
    key: 'filled',
    default: true,
  },
  {
    type: 'color',
    key: 'getFillColor',
    default: ['#3d7b1f'],
  },
  {
    type: 'boolean',
    key: 'stroked',
    default: true,
  },
  {
    type: 'color',
    key: 'getLineColor',
    default: ['#000000'],
  },
  {
    type: 'number',
    key: 'getLineWidth',
    default: 1,
  },
];
