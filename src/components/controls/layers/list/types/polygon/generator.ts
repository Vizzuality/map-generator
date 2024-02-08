import { randomPolygon } from '@turf/random';

export type PolygonConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id, bbox }: PolygonConfigProps) => {
  console.log(bbox);
  const randomPolygons = randomPolygon(10, {
    bbox,
  });

  return {
    id,
    '@@type': 'GeojsonLayer',
    data: randomPolygons,
    stroked: true,
    filled: true,
    getPosition: '@@=geometry.coordinates',
    getFillColor: [255, 140, 0],
    getLineColor: [0, 0, 0],
  };
};
