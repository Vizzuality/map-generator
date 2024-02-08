import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { $layersSettings } from '@/stores/layers';
import ColorPicker from '@/components/ui/color-picker';
import { LayerProps } from '@/containers/layers/types';

export const LayersPoints = ({ id, name, settings = {} }: LayerProps) => {
  const [color, setColor] = useState('#f97316');
  const setLayersSettings = useSetAtom($layersSettings);

  const handleColorChange = (color: string) => {
    setColor(color);
    setLayersSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        getFillColor: color,
      },
    }));
  };

  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-lg font-medium">Fill Color</h3>

        <ColorPicker color={color} onChange={handleColorChange} />
      </div>
    </section>
  );
};

export default LayersPoints;
