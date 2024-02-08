'use client';

import { useAtomValue } from 'jotai';
import { $layers } from '@/stores/layers';
import LayersControlListItem from '@/components/controls/layers/list/item';

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
