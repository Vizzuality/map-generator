import { BitmapLayer } from 'deck.gl/typed';
import DecodeExtension from '@/containers/layers/list/types/raster/extension';
import env from '@/env.mjs';

export type RasterLandCoverConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id }: RasterLandCoverConfigProps) => {
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
    data: `https://storage.googleapis.com/lcl_tiles/GLCLU2020/composite2020/{z}/{x}/{y}.png`,
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
          // if (color.r < 0.5) {
          //   discard;
          // }
          color = vec4(uColor.rgb * color.rgb, color.a);
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
