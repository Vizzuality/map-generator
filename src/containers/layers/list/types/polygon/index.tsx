import { useSetAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { $layersSettings } from '@/stores/layers';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ColorPickerField } from '@/containers/fields/color-picker';
import { LayerProps } from '@/containers/layers/types';
import { getParams } from '@/lib/json-converter';

export const LayersPolygon = ({ id, params_config, settings = {} }: LayerProps) => {
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

  const handleBooleanChange = (who: string, e: boolean) => {
    setLayersSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [who]: e,
      },
    }));
  };

  return (
    <section className="divide-y">
      <div className="space-y-3 py-4">
        <h2 className="shrink-0">Generator</h2>
        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">Count</h3>

          <Input
            value={`${s.count}`}
            type="number"
            min={0}
            onChange={handleNumberChange.bind(this, 'count')}
          />
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">Vertices</h3>

          <Input
            value={`${s.vertices}`}
            type="number"
            min={0}
            onChange={handleNumberChange.bind(this, 'vertices')}
          />
        </div>
      </div>
      <div className="space-y-3 py-4">
        <h2 className="shrink-0">Fill</h2>

        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">enabled</h3>

          <Checkbox
            checked={!!s.filled}
            onCheckedChange={handleBooleanChange.bind(this, 'filled')}
          />
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">color</h3>

          <ColorPickerField
            multiple
            colors={s.getFillColor as string[]}
            onChange={handleColorChange.bind(this, 'getFillColor')}
          />
        </div>
      </div>

      <div className="space-y-3 py-4">
        <h2 className="shrink-0">Line</h2>

        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">enabled</h3>

          <Checkbox
            checked={!!s.stroked}
            onCheckedChange={handleBooleanChange.bind(this, 'stroked')}
          />
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">color</h3>

          <ColorPickerField
            multiple
            colors={s.getLineColor as string[]}
            onChange={handleColorChange.bind(this, 'getLineColor')}
          />
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">width</h3>

          <Input
            value={`${s.getLineWidth}`}
            type="number"
            min={0}
            onChange={handleNumberChange.bind(this, 'getLineWidth')}
          />
        </div>
      </div>

      {/* <div className="space-y-3 py-4">
        <h2 className="shrink-0">Radius</h2>
        <div className="flex items-center space-x-2">
          <h3 className="shrink-0">Radius</h3>

          <Input
            value={`${s.getRadius}`}
            type="number"
            min={0}
            onChange={handleNumberChange.bind(this, 'getRadius')}
          />
        </div>
      </div> */}
    </section>
  );
};

export default LayersPolygon;
