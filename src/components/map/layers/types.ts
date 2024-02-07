import { AnyLayer, AnySource } from 'react-map-gl';

export type Config = {
  source?: AnySource;
  styles?: AnyLayer[];
};

export type LayerProps = {
  id?: string;
  zIndex?: number;
  onAdd?: (props: Config) => void;
  onRemove?: (props: Config) => void;
};
