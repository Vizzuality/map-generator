'use client';

import { useAtom } from 'jotai';
import { $contextualLayers, $protectedAreasConfig } from '@/stores/contextual-layers';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ContextualLayerKeys } from './constants';

const ContextualLayersControl = () => {
  const [contextualLayers, setContextualLayer] = useAtom($contextualLayers);
  const [protectedAreasConfig, setProtectedAreasConfig] = useAtom($protectedAreasConfig);

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
                  setContextualLayer({
                    ...contextualLayers,
                    [ContextualLayerKeys.ProtectedAreas]: checked,
                  })
                }
                checked={contextualLayers['protected-areas']}
              />
              <label htmlFor={ContextualLayerKeys.ProtectedAreas}>Protected Areas</label>
            </div>
            {contextualLayers['protected-areas'] && (
              <div className="grid grid-cols-2 items-center gap-2">
                <div className="flex items-center space-x-2">
                  <label className="shrink-0">Fill color</label>
                  <Input
                    type="color"
                    value={protectedAreasConfig.fillColor}
                    onChange={(e) =>
                      setProtectedAreasConfig({
                        ...protectedAreasConfig,
                        fillColor: e.target.value as string,
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="shrink-0">Line color</label>
                  <Input
                    type="color"
                    value={protectedAreasConfig.lineColor}
                    onChange={(e) =>
                      setProtectedAreasConfig({
                        ...protectedAreasConfig,
                        lineColor: e.target.value as string,
                      })
                    }
                  />
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox
                id={ContextualLayerKeys.Gain}
                onCheckedChange={(checked: boolean) =>
                  setContextualLayer({
                    ...contextualLayers,
                    [ContextualLayerKeys.Gain]: checked,
                  })
                }
                checked={contextualLayers.gain}
              />
              <label htmlFor={ContextualLayerKeys.Gain}>Gain</label>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContextualLayersControl;
