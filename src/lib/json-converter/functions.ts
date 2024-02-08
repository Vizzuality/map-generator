import chroma from 'chroma-js';

export const setColor = ({ color }: { color: string }) => {
  return chroma(color).rgb();
};

export const FUNCTIONS = {
  setColor,
};
