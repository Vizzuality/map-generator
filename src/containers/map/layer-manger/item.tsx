'use client';

import { Layer } from 'deck.gl/typed';

import DeckLayer from '@/components/map/layers/deck-layer';
import { parseConfig } from '@/lib/json-converter';
import type { LayerProps } from '@/containers/layers/types';

interface LayerManagerItemProps {
  id: string | number;
  beforeId: string;
  config: LayerProps['config'];
  params_config: LayerProps['params_config'];
  settings: Record<string, unknown>;
}

export const LayerManagerItem = ({
  id,
  config,
  params_config,
  beforeId,
  settings,
}: LayerManagerItemProps) => {
  const c = parseConfig<Layer>({
    config,
    params_config,
    settings,
  });

  console.log(c);

  return <DeckLayer id={`${id}-layer`} beforeId={beforeId} config={c} />;
};

export default LayerManagerItem;
