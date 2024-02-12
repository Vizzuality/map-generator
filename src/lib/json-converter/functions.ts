import {
  booleanPointInPolygon,
  featureCollection,
  randomPoint,
  bboxPolygon,
  booleanIntersects,
} from '@turf/turf';
import chroma from 'chroma-js';
import { Feature, FeatureCollection, MultiPolygon, Point, Polygon } from 'geojson';

import COUNTRIES_JSON from '@/data/countries.json';

const COUNTRIES = COUNTRIES_JSON as FeatureCollection<Polygon | MultiPolygon>;

export const setPointData = ({
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
  }

  const points: Feature<Point>[] = [];

  for (let i = 0; i < count; i++) {
    const r = randomPoint(1, {
      bbox,
    });

    // check if it's inside a country
    const isInside = COUNTRIES.features.some((country) => {
      if (r.features[0]) {
        return booleanPointInPolygon(r.features[0], country);
      }
    });

    if (!isInside) {
      i--;
    }

    if (isInside && r.features[0]) {
      points.push(r.features[0]);
    }
  }

  return featureCollection(points).features;
};

// export const getPointsDataComparator = ({ oldData, newData }) => {
//   console.log({ oldData, newData });
//   return true;
// };

export const setColor = ({ color }: { color: string }) => {
  return chroma(color).rgb();
};

export const FUNCTIONS = {
  setPointData,
  // getPointsDataComparator,
  setColor,
};
