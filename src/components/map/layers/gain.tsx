import { Layer, Source } from 'react-map-gl';

const GainLayer = () => (
  <Source
    id="gain"
    type="raster"
    tiles={['https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png']}
  >
    <Layer type="raster" />
  </Source>
);

export default GainLayer;
