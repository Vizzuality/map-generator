import chroma from 'chroma-js';
import { useAtomValue } from 'jotai';
import { Layer } from 'react-map-gl';
import { $layers } from '@/stores/layers';
import DeckJsonLayer from '@/components/map/layers/deck-layer';
import { DeckMapboxOverlayProvider } from '@/components/map/provider';
import { LayerManagerItem } from '@/containers/map/layer-manger/item';

export const LayerManager = () => {
  const layers = useAtomValue($layers);

  return (
    <DeckMapboxOverlayProvider>
      <>
        {/*
            Generate all transparent backgrounds to be able to sort by layers without an error
            - https://github.com/visgl/react-map-gl/issues/939#issuecomment-625290200
          */}
        {layers.map((l, i) => {
          const beforeId = i === 0 ? undefined : `${layers[i - 1]?.id}-layer`;

          return (
            <Layer
              id={`${l.id}-layer`}
              key={l.id}
              type="background"
              layout={{ visibility: 'none' }}
              beforeId={beforeId}
            />
          );
        })}

        {/*
          Loop through active layers. The id is gonna be used to fetch the current layer and know how to order the layers.
          The first item will always be at the top of the layers stack
        */}
        {layers.map((l, i) => {
          const beforeId = i === 0 ? 'custom-layers' : `${layers[i - 1]}-layer`;
          return (
            <LayerManagerItem
              {...l}
              key={l.id}
              settings={{ opacity: 1, visibility: true }}
              beforeId={beforeId}
            />
          );
        })}
      </>
    </DeckMapboxOverlayProvider>
  );
};

export default LayerManager;
