import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Layer, type LayerProps, Source } from 'react-map-gl';

const CARTO_ACCOUNT = 'wri-01';

const layerTpl = JSON.stringify({
  version: '1.3.0',
  stat_tag: 'API',
  layers: [
    {
      options: {
        cartocss: '#wdpa_protected_areas {  polygon-opacity: 1.0; polygon-fill: #704489 }',
        cartocss_version: '2.3.0',
        sql: 'SELECT * FROM wdpa_protected_areas',
      },
      type: 'cartodb',
    },
  ],
});

const fetchProtectedAreas = () =>
  axios
    .get(`https://${CARTO_ACCOUNT}.carto.com/api/v1/map`, {
      params: {
        stat_tag: 'API',
        config: layerTpl,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);

const LAYERS: LayerProps[] = [
  {
    id: 'fill_protected_areas',
    type: 'fill',
    'source-layer': 'layer0',
    paint: {
      'fill-color': '#00BBFF',
      'fill-opacity': 0.75,
    },
  },
  {
    id: 'line_protected_areas',
    type: 'line',
    'source-layer': 'layer0',
    paint: {
      'line-color': '#000000',
      'line-opacity': 0.1,
    },
  },
];

const ProtectedAreasLayer = () => {
  const { data } = useQuery({
    queryKey: ['protected-areas'],
    queryFn: fetchProtectedAreas,
  });

  if (!data) return null;

  const tileURL =
    `${data.cdn_url.templates.https.url}/${CARTO_ACCOUNT}/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.mvt`.replace(
      '{s}',
      'a'
    );

  return (
    <Source id="protected-areas" type="vector" tiles={[tileURL]}>
      {LAYERS.map((layer) => (
        <Layer {...layer} key={layer.id} />
      ))}
    </Source>
  );
};

export default ProtectedAreasLayer;
