import { atom, computed } from 'nanostores';

enum ContextualLayerKeys {
  ProtectedAreas = 'protected-areas',
  Gain = 'gain',
}

type ContextualControl = Record<ContextualLayerKeys, boolean>;

type ProtectedAreasConfig = {
  lineColor: string;
  fillColor: string;
};

export const $contextualLayers = atom<ContextualControl>({ 'protected-areas': false, gain: false });

export const $protectedAreasConfig = atom<ProtectedAreasConfig>({
  lineColor: '#000',
  fillColor: '#00BBFF',
});

export const setContextualLayer = (key: ContextualLayerKeys, value: boolean) => {
  $contextualLayers.set({ ...$contextualLayers.get(), [key]: value });
};

export const setProtectedAreasConfig = (config: Partial<ProtectedAreasConfig>) => {
  $protectedAreasConfig.set({ ...$protectedAreasConfig.get(), ...config });
};
