'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
const COUNTRIES = [
  {
    value: 'es',
    label: 'Spain',
  },
  {
    value: 'fr',
    label: 'France',
  },
  {
    value: 'it',
    label: 'Italy',
  },
  {
    value: 'ge',
    label: 'Germany',
  },
  {
    value: 'pt',
    label: 'Portugal',
  },
];

const AdminAreasControl = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div className="space-y-2">
      <h2>Admin areas</h2>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? COUNTRIES.find((framework) => framework.value === value)?.label
                : 'Select framework...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="show-boundaries" />
        <label htmlFor="show-boundaries">Show boundaries</label>
      </div>
    </div>
  );
};

export default AdminAreasControl;
