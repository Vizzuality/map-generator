import { useSetAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { $layersSettings } from '@/stores/layers';
import { Input } from '@/components/ui/input';
import { ColorPickerField } from '@/containers/fields/color-picker';
import { LayerProps } from '@/containers/layers/types';
import { getParams } from '@/lib/json-converter';

export const LayersRaster = ({ id, params_config, settings = {} }: LayerProps) => {
  const s = getParams({ params_config, settings });
  const setLayersSettings = useSetAtom($layersSettings);

  const handleColorChange = (who: string, colors: string[]) => {
    setLayersSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [who]: colors,
      },
    }));
  };

  const handleNumberChange = (who: string, e: ChangeEvent<HTMLInputElement>) => {
    setLayersSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [who]: +e.target.value,
      },
    }));
  };

  return (
    <section className="divide-y">
      <div className="space-y-3 py-4">
        <h2 className="shrink-0">Options</h2>

        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">color</h3>

          <ColorPickerField
            colors={s.uColor as string[]}
            onChange={handleColorChange.bind(this, 'uColor')}
          />
        </div>

        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">saturation</h3>

          <Input
            type="number"
            value={`${s.uSaturation}`}
            step={0.01}
            onChange={handleNumberChange.bind(this, 'uSaturation')}
          />
        </div>
      </div>
    </section>
  );
};

export default LayersRaster;
