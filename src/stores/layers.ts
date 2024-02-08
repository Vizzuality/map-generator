import { atom } from 'jotai';
import { LayerProps } from '@/containers/layers/types';

export const $layers = atom<LayerProps[]>([]);
export const $layersCount = atom<number>(1);
export const $layersSettings = atom<Record<string, Record<string, unknown>>>({});
