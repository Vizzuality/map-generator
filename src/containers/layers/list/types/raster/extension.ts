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

          // apply desaturation
          vec3 uColor_saturation(vec3 color) {
            float luminance = (color.r + color.g + color.b) * 0.33;
            return mix(color, vec3(luminance), uSaturation);
          }

          // apply tint
          vec3 uColor_tint(vec3 color) {
            return color * uColor.rgb;
          }
        `,
        'fs:DECKGL_FILTER_COLOR': `
          ${this.props.decodeFunction}
        `,
      },
    };
  }

  updateState(this: DecodeExtensionType) {
    const { decodeParams = {}, zoom } = this.props;

    for (const model of this.getModels()) {
      model.setUniforms({
        zoom,
        ...decodeParams,
      });
    }
  }
}

DecodeExtension.extensionName = 'DecodeExtension';
