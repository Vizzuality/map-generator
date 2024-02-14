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

export const setPointsData = ({
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

export const setPointsDataComparator = () => {
  return (oldData: unknown[], newData: unknown[]) => {
    if (Array.isArray(oldData) && Array.isArray(newData)) {
      return oldData.length === newData.length;
    }

    return false;
  };
};

export const setColor = ({ color }: { color: string }) => {
  return chroma(color).rgb();
};

export const setAccessorColor = ({ color }: { color: string }) => {
  const colorScale = chroma.scale(['white', color]);
  return ({ properties }: { properties: Record<string, any> }) => {
    return colorScale(properties.gis_area / 1000000).rgb();
  };
};

export const FUNCTIONS = {
  setPointsData,
  setPointsDataComparator,
  setColor,
  setAccessorColor,
};
