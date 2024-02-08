import { randomPoint } from '@turf/random';

export type PointsConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id, bbox }: PointsConfigProps) => {
  console.log(bbox);
  const randomPoints = randomPoint(100, {
    bbox,
  });

  console.log(randomPoints);

  return {
    id,
    '@@type': 'ScatterplotLayer',
    data: randomPoints.features,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    radiusUnits: 'pixels',
    getPosition: '@@=geometry.coordinates',
    getRadius: 10,
    getFillColor: [255, 140, 0],
    getLineColor: [0, 0, 0],
  };
};
