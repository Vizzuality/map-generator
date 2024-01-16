import BasemapControl from '@/components/controls/basemap';
import Map from '@/components/map';
import { ScrollArea } from '@/components/ui/scroll-area';

const Home = () => {
  return (
    <main className="flex h-full items-stretch">
      <div className="flex w-96 flex-col overflow-auto border-r">
        <ScrollArea className="p-4">
          <BasemapControl />
        </ScrollArea>
      </div>
      <div className="grow bg-gray-50" id="preview">
        <Map />
      </div>
    </main>
  );
};

export default Home;
