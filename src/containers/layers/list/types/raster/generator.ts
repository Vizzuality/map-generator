import { randomPoint } from '@turf/random';

export type RasterConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id, bbox }: RasterConfigProps) => {
  console.log(bbox);
  const randomRaster = randomPoint(100, {
    bbox,
  });

  console.log(randomRaster);

  return {
    id,
    '@@type': 'ScatterplotLayer',
    data: randomRaster.features,
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
