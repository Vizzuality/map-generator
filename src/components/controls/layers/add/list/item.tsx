import { useSetAtom } from 'jotai';
import { $layers } from '@/stores/layers';
import { LayerType } from '@/components/controls/layers/types';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const LayersAddListItem = ({ id, name, type }: LayerType) => {
  const setLayers = useSetAtom($layers);

  const handleAddLayer = () => {
    console.info('addLayer');
    setLayers((prevLayers) => [
      ...prevLayers,
      {
        id: `layer-${prevLayers.length + 1}`,
        type,
      },
    ]);
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
