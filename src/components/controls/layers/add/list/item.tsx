import { useAtom, useSetAtom } from 'jotai';
import { useId } from 'react';
import { $layers, $layersCount } from '@/stores/layers';
import { LayerType } from '@/components/controls/layers/types';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const LayersAddListItem = ({ id, name, type }: LayerType) => {
  const uuid = useId();
  const [layersCount, setLayersCount] = useAtom($layersCount);
  const setLayers = useSetAtom($layers);

  const handleAddLayer = () => {
    setLayers((prevLayers) => [
      ...prevLayers,
      {
        id: `${id}-${uuid}`,
        name: `${type}-${layersCount}`,
        type,
      },
    ]);

    setLayersCount((prevCount) => prevCount + 1);
  };

  return (
    <DropdownMenuItem
      className="w-full cursor-pointer justify-center rounded-sm border border-gray-300 p-4 transition-colors hover:bg-gray-100"
      onClick={handleAddLayer}
    >
      {name}
    </DropdownMenuItem>
  );
};

export default LayersAddListItem;
