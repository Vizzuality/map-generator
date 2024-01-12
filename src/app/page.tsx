import { ScrollArea } from '@/components/ui/scroll-area';
import BasemapControl from '@/components/controls/basemap';

const Home = () => {
  return (
    <main className="flex h-full items-stretch">
      <div className="flex w-96 flex-col overflow-auto border-r">
        <ScrollArea className="p-4">
          <BasemapControl />
        </ScrollArea>
      </div>
      <div className="grow bg-gray-50" id="preview">
        Preview of the map
      </div>
    </main>
  );
};

export default Home;
