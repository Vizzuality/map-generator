'use client';

import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';

const Export = () => {
  const handleClick = useCallback(() => {
    const node = document.getElementById('preview');
    if (node) {
      toPng(node).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `map-export-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  }, []);

  return (
    <Button type="button" onClick={handleClick} size="sm">
      Export to PNG
    </Button>
  );
};

export default Export;
