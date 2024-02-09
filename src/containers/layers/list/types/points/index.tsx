import { useSetAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { $layersSettings } from '@/stores/layers';
import ColorPicker from '@/components/ui/color-picker';
import { Input } from '@/components/ui/input';
import { LayerProps } from '@/containers/layers/types';
import { getParams } from '@/lib/json-converter';

export const LayersPoints = ({ id, name, params_config, settings = {} }: LayerProps) => {
  const s = getParams({ params_config, settings });
  const setLayersSettings = useSetAtom($layersSettings);

  const handleColorChange = (who: string, color: string) => {
    setLayersSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [who]: color,
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
    <section className="space-y-2">
      <div className="flex items-center space-x-2">
        <h3 className="shrink-0">Fill Color</h3>

        <ColorPicker
          color={`${s.getFillColor}`}
          onChange={handleColorChange.bind(this, 'getFillColor')}
        />
      </div>
      <div className="flex items-center space-x-2">
        <h3 className="shrink-0">Line Color</h3>

        <ColorPicker
          color={`${s.getLineColor}`}
          onChange={handleColorChange.bind(this, 'getLineColor')}
        />
      </div>

      <div className="flex items-center space-x-2">
        <h3 className="shrink-0">Line Width</h3>

        <Input
          value={`${s.getLineWidth}`}
          type="number"
          onChange={handleNumberChange.bind(this, 'getLineWidth')}
        />
      </div>

      <div className="flex items-center space-x-2">
        <h3 className="shrink-0">Radius</h3>

        <Input
          value={`${s.getRadius}`}
          type="number"
          onChange={handleNumberChange.bind(this, 'getRadius')}
        />
      </div>
    </section>
  );
};

export default LayersPoints;
