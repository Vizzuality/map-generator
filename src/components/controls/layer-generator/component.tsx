'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import ColorRangeInput from './color-range-input';

enum LayerType {
  Vector = 'vector',
  Raster = 'raster',
}

enum SourceType {
  RandomPoints = 'random-points',
  AdminAreas = 'admin-areas',
}

enum AggregationType {
  Sum = 'sum',
  Mean = 'mean',
  Median = 'median',
  Min = 'min',
  Max = 'max',
}

enum DistributionType {
  Quantile = 'quantile',
  Percentile = 'percentile',
}

type GeneratedLayer = {
  id: string;
  type: LayerType;
  source: SourceType;
  colorRange: string[];
  aggregation: AggregationType;
  distribution: DistributionType;
  order: number;
  opacity: number;
};

const LayerGeneratorControl = () => {
  const [layers, setLayers] = useState<GeneratedLayer[]>([]);

  const handleAddLayer = useCallback(() => {
    setLayers((prevLayers) => [
      ...prevLayers,
      {
        id: `layer-${prevLayers.length + 1}`,
        type: LayerType.Vector,
        source: SourceType.RandomPoints,
        colorRange: ['#ffffff', '#000000'],
        aggregation: AggregationType.Sum,
        distribution: DistributionType.Quantile,
        order: prevLayers.length + 1,
        opacity: 1,
      },
    ]);
  }, []);

  const handleRemoveLayer = useCallback((layerId: GeneratedLayer['id']) => {
    setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== layerId));
  }, []);

  return (
    <section className="space-y-2 py-4">
      <div className="flex items-center justify-between">
        <h2>Layer generator</h2>
        <Button variant="default" size="sm" onClick={handleAddLayer}>
          <Plus className="h-4 w-4" />
          Add layer
        </Button>
      </div>
      <div className="space-y-2">
        {layers.map((layer) => (
          <div key={layer.id} className="space-y-4 rounded border p-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={LayerType.Vector}>Vector</SelectItem>
                    <SelectItem value={LayerType.Raster}>Raster</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SourceType.RandomPoints}>Random points</SelectItem>
                    <SelectItem value={SourceType.AdminAreas}>Admin areas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Aggregation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AggregationType.Sum}>Sum</SelectItem>
                    <SelectItem value={AggregationType.Mean}>Mean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Distribution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DistributionType.Quantile}>Quantile</SelectItem>
                    <SelectItem value={DistributionType.Percentile}>Percentile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ColorRangeInput />
              <div className="col-span-12 grid h-10 grid-cols-12 items-center gap-2 rounded-md border px-3 py-2">
                <label className="col-span-4">Opacity ({75})</label>
                <div className="col-span-8">
                  <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                </div>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm" onClick={handleRemoveLayer.bind(this, layer.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LayerGeneratorControl;
