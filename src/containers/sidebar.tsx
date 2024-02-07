import { ScrollArea } from '@/components/ui/scroll-area';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="flex w-96 flex-col">
      <div className="flex  flex-col overflow-auto">
        <ScrollArea>
          <div className="divide-y px-4">{children}</div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default Sidebar;
