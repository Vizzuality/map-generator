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
    getPosition: '@@=geometry.coordinates',
    // Radius
    radiusUnits: 'pixels',
    getRadius: '@@#params.getRadius',
    // Fill
    getFillColor: {
      '@@function': 'setColor',
      color: '@@#params.getFillColor',
    },
    // Line
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
    type: 'color',
    key: 'getFillColor',
    default: '#f97316',
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
  {
    type: 'number',
    key: 'getRadius',
    default: 10,
  },
];
