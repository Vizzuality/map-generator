import { randomPolygon } from '@turf/random';

export type PolygonConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id, bbox }: PolygonConfigProps) => {
  const lngDiff = bbox[2] - bbox[0];
  const randomPolygons = randomPolygon(5, {
    bbox,
    num_vertices: 5,
    max_radial_length: lngDiff * 0.1,
  });

  return {
    id,
    '@@type': 'GeoJsonLayer',
    data: randomPolygons,
    stroked: true,
    filled: true,
    getPosition: '@@=geometry.coordinates',
    getFillColor: [249, 115, 22],
    getLineColor: [0, 0, 0],
    getLineWidth: 1,
    lineWidthUnits: 'pixels',
  };
};

export const DEFAULT_CONFIG_PARAMS = [
  {
    key: 'getFillColor',
    default: '#f97316',
  },
  {
    key: 'getLineColor',
    default: '#000000',
  },
  {
    key: 'getLineWidth',
    default: 1,
  },
];
