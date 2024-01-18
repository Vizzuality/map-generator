import { Checkbox } from '@/components/ui/checkbox';
import { CONTEXTUAL_LAYERS } from './constants';

const ContextualLayersControl = () => (
  <div className="space-y-2 py-4">
    <h2>Contextual layers</h2>
    <ul className="space-y-2">
      {CONTEXTUAL_LAYERS.map(({ id, name }) => (
        <li key={id}>
          <div className="flex items-center space-x-2">
            <Checkbox id={id} />
            <label htmlFor={id}>{name}</label>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ContextualLayersControl;
