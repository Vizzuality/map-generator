'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-map-gl';
import { Button } from '../components/ui/button';

const Export = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { default: map } = useMap();
  const handleClick = useCallback(() => {
    const imageFromCanvas = map?.getCanvas().toDataURL('image/png');
    if (imageFromCanvas) {
      const link = document.createElement('a');
      link.download = `map-export-${Date.now()}.png`;
      link.href = imageFromCanvas;
      link.click();
    }
  }, [map]);

  useEffect(() => {
    if (!isMapLoaded && map) {
      setIsMapLoaded(true);
    }
  }, [map, isMapLoaded]);

  return (
    <Button type="button" onClick={handleClick} size="sm" disabled={!isMapLoaded}>
      Export to PNG
    </Button>
  );
};

export default Export;
