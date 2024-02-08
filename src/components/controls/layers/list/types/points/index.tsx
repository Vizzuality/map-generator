import { FC, ReactNode } from 'react';
import { LayerProps } from '@/components/controls/layers/types';

export const LayersPoints = ({ name }: LayerProps) => {
  return <section>{name}</section>;
};

export default LayersPoints;
