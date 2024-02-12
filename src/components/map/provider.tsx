/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { Layer } from 'deck.gl/typed';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useControl, useMap } from 'react-map-gl';

interface DeckMapboxOverlayContext {
  addLayer: (layer: any) => void;
  removeLayer: (id: string) => void;
}

const Context = createContext<DeckMapboxOverlayContext>({
  addLayer: () => {
    console.info('addLayer');
  },
  removeLayer: () => {
    console.info('removeLayer');
  },
});

function useMapboxOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  }
) {
  const { default: map } = useMap();
  map?.getCanvas().style.cursor;
  const overlay = useControl<MapboxOverlay>(
    () =>
      new MapboxOverlay({
        ...props,
        getCursor: () => map?.getCanvas().style.cursor || '',
      })
  );
  overlay.setProps(props);

  return overlay;
}

export const DeckMapboxOverlayProvider = ({ children }: PropsWithChildren) => {
  const layersRef = useRef<any[]>([]);

  const OVERLAY = useMapboxOverlay({
    interleaved: true,
  });

  const addLayer = useCallback(
    (layer: any) => {
      const newLayers = [...layersRef.current.filter((l) => l.id !== layer.id), layer];

      layersRef.current = newLayers;
      return OVERLAY.setProps({ layers: newLayers });
    },
    [OVERLAY]
  );

  const removeLayer = useCallback(
    (id: string) => {
      const newLayers = [...layersRef.current.filter((l) => l.id !== id)];

      layersRef.current = newLayers;
      OVERLAY.setProps({ layers: newLayers });
    },
    [OVERLAY]
  );

  const context = useMemo(
    () => ({
      addLayer,
      removeLayer,
    }),
    [addLayer, removeLayer]
  );

  return (
    <Context.Provider key="deck-mapbox-provider" value={context}>
      {children}
    </Context.Provider>
  );
};

export const useDeckMapboxOverlayContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useDeckMapboxOverlayContext must be used within a DeckMapboxOverlayProvider');
  }

  return context;
};

export const useDeckMapboxOverlay = ({
  id,
  layer,
  did,
}: {
  id: string;
  layer: Layer | null;
  did?: string;
}) => {
  const i = did ? `${id}-${did}-deck` : `${id}-deck`;
  const { addLayer, removeLayer } = useDeckMapboxOverlayContext();

  useEffect(() => {
    if (!layer) return;
    // Give the map a chance to load the background layer before adding the Deck layer
    setTimeout(() => {
      // https://github.com/visgl/deck.gl/blob/c2ba79b08b0ea807c6779d8fe1aaa307ebc22f91/modules/mapbox/src/resolve-layers.ts#L66
      // @ts-expect-error not typed
      addLayer(layer.clone({ id: i, beforeId: id }));
    }, 10);
  }, [i, id, layer, addLayer]);

  useEffect(() => {
    if (!layer) return;
    return () => {
      removeLayer(i);
    };
  }, [i, removeLayer]); // eslint-disable-line react-hooks/exhaustive-deps

  return { addLayer, removeLayer };
};
