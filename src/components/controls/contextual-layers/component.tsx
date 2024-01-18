'use client';

import { useStore } from '@nanostores/react';
import { $contextualLayers, setContextualLayer } from '@/stores/contextual-layers';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ContextualLayerKeys } from './constants';

const ContextualLayersControl = () => {
  const contextualLayers = useStore($contextualLayers);

  return (
    <div className="space-y-2 py-4">
      <h2>Contextual layers</h2>
      <ul className="space-y-2">
        <li>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={ContextualLayerKeys.ProtectedAreas}
                onCheckedChange={(checked: boolean) =>
                  setContextualLayer(ContextualLayerKeys.ProtectedAreas, checked)
                }
                checked={contextualLayers['protected-areas']}
              />
              <label htmlFor={ContextualLayerKeys.ProtectedAreas}>Protected Areas</label>
            </div>
            {contextualLayers['protected-areas'] && (
              <div className="grid grid-cols-2 items-center gap-2">
                <div className="flex items-center space-x-2">
                  <label className="shrink-0">Fill color</label>
                  <Input type="color" />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="shrink-0">Line color</label>
                  <Input type="color" />
                </div>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContextualLayersControl;
