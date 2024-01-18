import chroma from 'chroma-js';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const COLOR_PRESETS: Record<string, string[]> = {
  'blue-green': ['#4682B4', '#228B22'],
  'red-yellow': ['#B22222', '#FFD700'],
  custom: ['#ffffff', '#000000'],
};

const ColorRangeInput = () => {
  const [buckets, setBuckets] = useState<number>(6);
  const [colorPresetKey, setColorPresetKey] = useState<string>('blue-green');
  const colors = chroma.scale(COLOR_PRESETS[colorPresetKey]).mode('lch').colors(buckets);

  return (
    <div className="col-span-12 items-start space-y-2 rounded-md border px-3 py-2">
      <label className="block">Colors</label>
      <div className="grid grid-cols-12 gap-2">
        <Input
          className="col-span-4"
          type="number"
          placeholder="Buckets"
          defaultValue={buckets}
          max={10}
          min={2}
          onChange={(event) => setBuckets(Number(event.target.value))}
        />
        <div className="col-span-8">
          <Select onValueChange={setColorPresetKey} value={colorPresetKey}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Presets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red-yellow">Red / Yellow</SelectItem>
              <SelectItem value="blue-green">Green / Blue</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {colorPresetKey === 'custom' ? (
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <div key={`item-${color}`}>
              <Input type="color" className="w-full p-1" defaultValue={color} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <div key={`item-${color}`}>
              <div className="h-6 w-full" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorRangeInput;
