import { LucideX } from 'lucide-react';
import ColorPicker from '@/components/ui/color-picker';

type ColorPickerFieldProps = {
  colors: string[];
  multiple?: boolean;
  onChange: (colors: string[]) => void;
};

export const ColorPickerField = ({ colors, multiple, onChange }: ColorPickerFieldProps) => {
  const handleChange = (i: number, color: string) => {
    const prevColors = colors;
    const newColors = [...prevColors];
    newColors[i] = color;

    onChange(newColors);
  };

  const handleAdd = () => {
    const newColors = [...colors, '#000000'];
    onChange(newColors);
  };

  const handleRemove = (i: number) => {
    const newColors = colors.filter((_, index) => index !== i);
    onChange(newColors);
  };

  return (
    <>
      {Array.isArray(colors) &&
        colors.map((color, i) => (
          <div className="relative flex items-center" key={`${i}`}>
            <ColorPicker color={`${color}`} onChange={handleChange.bind(this, i)} />

            {i !== 0 && (
              <button
                type="button"
                className="absolute -right-1.5 -top-1.5 rounded-full border border-primary bg-white transition-colors duration-200 ease-in-out hover:bg-primary hover:text-white"
                onClick={handleRemove.bind(this, i)}
              >
                <LucideX className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}

      {multiple && (
        <button type="button" className="text-xs text-primary hover:underline" onClick={handleAdd}>
          Add color
        </button>
      )}
    </>
  );
};

export default ColorPickerField;
