import { Layer, LayerExtension } from '@deck.gl/core/typed';

type DecodeExtensionType = Layer<{
  decodeFunction: string;
  decodeParams: Record<string, unknown>;
  zoom: number;
}>;

export default class DecodeExtension extends LayerExtension {
  getShaders(this: DecodeExtensionType) {
    return {
      inject: {
        'fs:#decl': /* glsl*/ `
          uniform float uSaturation;
          uniform vec4 uColor;
          uniform vec2 uRanges[10];

          // apply desaturation
          vec3 uColor_saturation(vec3 color) {
            float luminance = (color.r + color.g + color.b) * 0.33;
            return mix(color, vec3(luminance), uSaturation);
          }
        `,
        'fs:DECKGL_FILTER_COLOR': `
          ${this.props.decodeFunction}
        `,
      },
    };
  }

  updateState(this: DecodeExtensionType) {
    const { decodeParams = {} } = this.props;

    for (const model of this.getModels()) {
      model.setUniforms({
        ...decodeParams,
      });
    }
  }
}

DecodeExtension.extensionName = 'DecodeExtension';
