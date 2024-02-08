import { LayersAddListItem } from '@/containers/layers/add/list/item';
import { LAYER_TYPES } from '@/constants/layers';

export const LayersAddList = () => {
  return (
    <ul className="grid grid-cols-3 gap-4 p-4">
      {LAYER_TYPES.map((l) => (
        <li key={l.id}>
          <LayersAddListItem {...l} />
        </li>
      ))}
    </ul>
  );
};

export default LayersAddList;
