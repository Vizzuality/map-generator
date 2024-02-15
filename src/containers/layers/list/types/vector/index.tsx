import { useSetAtom } from 'jotai';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { $layersSettings } from '@/stores/layers';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ColorPickerField } from '@/containers/fields/color-picker';
import { LayerProps } from '@/containers/layers/types';
import { getParams } from '@/lib/json-converter';

export const LayersVector = ({ id, params_config, settings = {} }: LayerProps) => {
  const s = getParams({ params_config, settings });
  const setLayersSettings = useSetAtom($layersSettings);

  const handleColorChange = useCallback(
    (who: string, colors: string[]) => {
      setLayersSettings((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [who]: colors,
        },
      }));
    },
    [id, setLayersSettings]
  );

  const handleNumberChange = useCallback(
    (who: string, e: ChangeEvent<HTMLInputElement>) => {
      setLayersSettings((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [who]: +e.target.value,
        },
      }));
    },
    [id, setLayersSettings]
  );

  const handleBooleanChange = useCallback(
    (who: string, e: boolean) => {
      setLayersSettings((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [who]: e,
        },
      }));
    },
    [id, setLayersSettings]
  );

  // const ELEMENTS = useMemo(() => {
  //   return params_config.map((param) => {
  //     switch (param.type) {
  //       case 'boolean':
  //         return (
  //           <div className="flex items-center space-x-2">
  //             <h3 className="shrink-0">{param.label}</h3>
  //             <Checkbox
  //               checked={!!s[param.key]}
  //               onCheckedChange={handleBooleanChange.bind(this, param.key)}
  //             />
  //           </div>
  //         );
  //       case 'color':
  //         return (
  //           <div className="flex items-center space-x-2">
  //             <h3 className="shrink-0">{param.label}</h3>
  //             <ColorPickerField
  //               colors={s[param.key] as string[]}
  //               onChange={handleColorChange.bind(this, param.key)}
  //             />
  //           </div>
  //         );
  //       case 'number':
  //         return (
  //           <div className="flex items-center space-x-2">
  //             <h3 className="shrink-0">{param.label}</h3>
  //             <Input
  //               value={`${s[param.key]}`}
  //               type="number"
  //               min={0}
  //               onChange={handleNumberChange.bind(this, param.key)}
  //             />
  //           </div>
  //         );
  //       default:
  //         return null;
  //     }
  //   });
  // }, [params_config, s, handleBooleanChange, handleColorChange, handleNumberChange]);

  // console.log(ELEMENTS);

  return (
    <section className="divide-y">
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

export default LayersVector;
