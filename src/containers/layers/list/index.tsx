'use client';

import { Accordion } from '@radix-ui/react-accordion';
import { useAtomValue } from 'jotai';
import { $layers } from '@/stores/layers';
import LayersControlListItem from '@/containers/layers/list/item';

const LayersControlList = () => {
  const layers = useAtomValue($layers);

  return (
    <div className="space-y-2">
      {layers.map((layer) => (
        <LayersControlListItem key={layer.id} {...layer} />
      ))}
    </div>
  );
};

export default LayersControlList;
