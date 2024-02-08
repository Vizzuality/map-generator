'use client';

import { useAtomValue } from 'jotai';
import { $layers } from '@/stores/layers';
import { LayersAdd } from '@/components/controls/layers/add';

const LayersControl = () => {
  const layers = useAtomValue($layers);
  console.log({ layers });

  return (
    <section className="space-y-2 py-4">
      <div className="flex items-center justify-between">
        <h2>Layers</h2>

        <LayersAdd />
      </div>
    </section>
  );
};

export default LayersControl;
