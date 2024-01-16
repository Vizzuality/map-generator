'use client';

import { useCallback } from 'react';
import { useMap } from 'react-map-gl';
import { Button } from '../components/ui/button';

const Export = () => {
  const { previewMap: map } = useMap();
  const handleClick = useCallback(() => {
    const imageFromCanvas = map?.getCanvas().toDataURL('image/png');
    if (imageFromCanvas) {
      const link = document.createElement('a');
      link.download = `map-export-${Date.now()}.png`;
      link.href = imageFromCanvas;
      link.click();
    }
  }, []);

  return (
    <Button type="button" onClick={handleClick} size="sm">
      Export to PNG
    </Button>
  );
};

export default Export;
