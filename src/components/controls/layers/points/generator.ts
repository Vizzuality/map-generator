import { randomPoint } from '@turf/random';

export const DEFAULT_CONFIG = (id: string) => {
  const randomPoints = randomPoint(100, {
    // bbox: [-122.519, 37.704, -122.355, 37.829],
  });

  console.log(randomPoints);

  return {
    id,
    '@@type': 'ScatterplotLayer',
    data: randomPoints.features,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: '@@=geometry.coordinates',
    getRadius: 5,
    getFillColor: [255, 140, 0],
    getLineColor: [0, 0, 0],
  };
};
