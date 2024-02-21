import { BitmapLayer } from 'deck.gl/typed';
import DecodeExtension from '@/containers/layers/list/types/raster/extension';
import env from '@/env.mjs';

export type RasterTerrainRGBConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id }: RasterTerrainRGBConfigProps) => {
  const min = 10;
  const max = 8890;

  const rs = Array.from({ length: 10 * 2 })
    .map(() => {
      return Math.random() * (max - min) + min;
    })
    .sort((a, b) => a - b);

  return {
    id,
    '@@type': 'TileLayer',
    data: `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
    tileSize: 256,
    decodeParams: {
      uSaturation: '@@#params.uSaturation',
      uColor: {
        '@@function': 'setColor',
        color: '@@#params.uColor',
        gl: true,
      },
      uRanges: rs,
    },
    renderSubLayers: (props: any) => {
      const {
        bbox: { west, south, east, north },
      } = props.tile;

      if (!props.data) return null;

      return new BitmapLayer({
        ...props,
        data: undefined,
        image: props.data,
        bounds: [west, south, east, north],
        uSaturation: props.decodeParams.uSaturation,
        uColor: props.decodeParams.uColor[0],
        uRanges: props.decodeParams.uRanges,
        decodeFunction: /*glsl*/ `
          float height = -10000.0 + (((color.r * 255.0) * 256.0 * 256.0 + (color.g * 255.0) * 256.0 + (color.b * 255.0)) * 0.1);
          float h = log(height + 1.0) / log(8849.0 + 1.0);
          float c = 0.25 + (0.75 * h);
          // float h = height / 8849.0;

          bool shouldDiscard = true;
          for (int i = 0; i < 10; ++i) {
            if (height > uRanges[i].x && height < uRanges[i].y) {
              shouldDiscard = false;
              break;
            }
          }

          if (shouldDiscard) {
            discard;
          }

          color = vec4(uColor.r * c, uColor.g * c, uColor.b * c, 1.0);
          color = vec4(uColor_saturation(color.rgb), color.a);
        `,
        extensions: [new DecodeExtension()],
      });
    },
  };
};

export const DEFAULT_CONFIG_PARAMS = [
  {
    type: 'number',
    key: 'uSaturation',
    label: 'saturation',
    default: 0,
    group: 'Fill',
  },
  {
    type: 'color',
    key: 'uColor',
    label: 'color',
    default: ['#61ef0a'],
    group: 'Fill',
  },
];
