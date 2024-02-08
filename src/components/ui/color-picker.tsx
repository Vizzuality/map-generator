import { HexColorPicker } from 'react-colorful';
import { useDebounce } from 'rooks';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const handleChange = useDebounce(onChange, 100);

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className="h-8 w-8 rounded-md border border-gray-300"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto">
        <HexColorPicker color={color} onChange={handleChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
