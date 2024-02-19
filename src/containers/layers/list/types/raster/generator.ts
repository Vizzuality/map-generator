import { BitmapLayer } from 'deck.gl/typed';
import DecodeExtension from '@/containers/layers/list/types/raster/extension';
import env from '@/env.mjs';

export type RasterConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id }: RasterConfigProps) => {
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
        decodeFunction: /*glsl*/ `
          float height = -10000.0 + (((color.r * 255.0) * 256.0 * 256.0 + (color.g * 255.0) * 256.0 + (color.b * 255.0)) * 0.1);

          float h = height / 8849.0;
          // color = vec4(0.75 * (1.0 - h), 0.9 * (1.0 - h), 0.9 * (h), (0.5 * h) + 0.5);
          color = vec4(uColor.r * (1.0 - h), uColor.g * (1.0 - h), uColor.b * (1.0 - h), (0.5 * h) + 0.5);

          if (
            (height < 10.0) ||
            (height > 100.0 && height < 200.0) ||
            (height > 300.0 && height < 400.0) ||
            (height > 500.0 && height < 1000.0) ||
            (height > 1500.0 && height < 2000.0) ||
            (height > 2500.0 && height < 3000.0) ||
            (height > 3500.0 && height < 4000.0) ||
            (height > 4500.0 && height < 5000.0) ||
            (height > 5500.0 && height < 6000.0)
          ) {
            discard;
          }

          // color = apply_opacity(uColor_tint(uColor_saturation(color.rgb)), color.a * opacity);
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
    default: ['#3d7b1f'],
    group: 'Fill',
  },
];
