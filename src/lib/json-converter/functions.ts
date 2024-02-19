import {
  booleanPointInPolygon,
  featureCollection,
  randomPoint,
  bboxPolygon,
  booleanIntersects,
  randomPolygon,
} from '@turf/turf';
import chroma from 'chroma-js';
import { Feature, FeatureCollection, MultiPolygon, Point, Polygon } from 'geojson';

import COUNTRIES_JSON from '@/data/countries.json';

const COUNTRIES = COUNTRIES_JSON as FeatureCollection<Polygon | MultiPolygon>;

/*
  *****
  POINTS
  *****
*/
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

    const p: Feature<Point> = r.features[0] as Feature<Point>;

    // check if it's inside a country
    const isInside = COUNTRIES.features.some((country) => {
      if (p) {
        return booleanPointInPolygon(p, country);
      }
    });

    if (!isInside) {
      i--;
    }

    if (isInside && p) {
      points.push(p);
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

/*
  *****
  POLYGONS
  *****
*/
export const setPolygonsData = ({
  count,
  vertices,
  bbox,
}: {
  count: number;
  vertices: number;
  bbox: [number, number, number, number];
}) => {
  const lngDiff = bbox[2] - bbox[0];
  const randomPolygons = randomPolygon(count, {
    bbox,
    num_vertices: vertices,
    max_radial_length: lngDiff * 0.1,
  });

  return randomPolygons.features;
};

export const setPolygonsDataComparator = ({
  count,
  vertices,
}: {
  count: number;
  vertices: number;
}) => {
  return (newData: unknown[], oldData: unknown[]) => {
    if (Array.isArray(oldData) && Array.isArray(newData)) {
      return oldData.length === newData.length;
    }

    return false;
  };
};

/*
  *****
  COLOR
  *****
*/
export const setColor = ({ color, gl }: { color: string[]; gl?: boolean }) => {
  const colorScale = chroma.scale(color);

  if (gl) {
    return colorScale(1).gl();
  }

  return colorScale(1).rgb();
};

export const setAccesorColor = ({
  color,
  gl,
  prop,
  propFactor = 1,
}: {
  color: string[];
  gl?: boolean;
  prop?: string;
  propFactor?: number;
}) => {
  const colorScale = chroma.scale(color);

  return ({ properties }: { properties: Record<string, any> }) => {
    if (!prop) {
      if (gl) {
        return colorScale(1).gl();
      }

      return colorScale(1).rgb();
    }

    if (gl) {
      return colorScale(properties[prop] / propFactor).gl();
    }

    return colorScale(properties[prop] / propFactor).rgb();
  };
};

export const FUNCTIONS = {
  setPointsData,
  setPointsDataComparator,
  setPolygonsData,
  setPolygonsDataComparator,
  setColor,
  setAccesorColor,
};
