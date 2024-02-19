'use client';

import { LayersAdd } from '@/containers/layers/add';
import LayersControlList from '@/containers/layers/list';

const LayersControl = () => {
  return (
    <section className="space-y-2 py-4">
      <div className="flex items-center justify-between">
        <h2>Layers</h2>

        <LayersAdd />
      </div>
      <LayersControlList />
    </section>
  );
};

export default LayersControl;
