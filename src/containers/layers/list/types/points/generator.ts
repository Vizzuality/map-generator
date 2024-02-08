import {
  booleanPointInPolygon,
  featureCollection,
  randomPoint,
  bboxPolygon,
  booleanIntersects,
} from '@turf/turf';
import { Feature, FeatureCollection, MultiPolygon, Point, Polygon } from 'geojson';
import COUNTRIES_JSON from '@/data/countries.json';

const COUNTRIES = COUNTRIES_JSON as FeatureCollection<Polygon | MultiPolygon>;

export type PointsConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const generateRandomPoints = ({
  count,
  bbox,
}: {
  count: number;
  bbox: [number, number, number, number];
}) => {
  const extent = bboxPolygon(bbox);

  const insideExtent = COUNTRIES.features.some((country) => {
    return booleanIntersects(extent, country);
  });

  if (!insideExtent) {
    throw new Error('Extent is not inside any country');
    return featureCollection([]);
  }

  const points: Feature<Point>[] = [];

  for (let i = 0; i < count; i++) {
    if (i === count) {
      break;
    }

    const r = randomPoint(1, {
      bbox,
    });

    // check if it's inside a country
    const isInside = COUNTRIES.features.some((country) => {
      if (r.features[0]) {
        return booleanPointInPolygon(r.features[0], country);
      }
    });

    if (!isInside && i > 0) {
      i--;
    }

    if (isInside && r.features[0]) {
      points.push(r.features[0]);
    }
  }

  return featureCollection(points);
};

export const DEFAULT_CONFIG = ({ id, bbox }: PointsConfigProps) => {
  const points = generateRandomPoints({
    count: 100,
    bbox,
  });

  return {
    id,
    '@@type': 'ScatterplotLayer',
    data: points.features,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    radiusUnits: 'pixels',
    getPosition: '@@=geometry.coordinates',
    getRadius: 10,
    getFillColor: {
      '@@function': 'setColor',
      color: '@@#params.getFillColor',
    },
    getLineColor: {
      '@@function': 'setColor',
      color: '@@#params.getLineColor',
    },
  };
};
