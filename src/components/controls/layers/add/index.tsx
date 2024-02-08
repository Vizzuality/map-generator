import { Plus } from 'lucide-react';
import { LayersAddList } from '@/components/controls/layers/add/list';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LayersAdd = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="space-x-1" variant="default" size="sm">
          <span>Add layer</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full" align="start">
        <LayersAddList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LayersAdd;
