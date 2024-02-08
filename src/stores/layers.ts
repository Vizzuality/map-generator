import { atom } from 'jotai';
import { Layer } from '@/components/controls/layers/types';

export const $layers = atom<Layer[]>([]);
