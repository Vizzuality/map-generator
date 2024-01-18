import AdminAreasControl from '@/components/controls/admin-areas';
import BasemapControl from '@/components/controls/basemap';
import ContextualControl from '@/components/controls/contextual-layers';
import LayerGeneratorControl from '@/components/controls/layer-generator';
import Map from '@/components/map';
import { ScrollArea } from '@/components/ui/scroll-area';

const Home = () => {
  return (
    <main className="flex h-full items-stretch">
      <div className="flex w-96 flex-col overflow-auto">
        <ScrollArea className="px-4">
          <div className="divide-y">
            <BasemapControl />
            <ContextualControl />
            {/* <AdminAreasControl /> */}
            <LayerGeneratorControl />
          </div>
        </ScrollArea>
      </div>
      <div className="grow py-4 pr-4" id="preview">
        <div className="h-full w-full rounded border bg-gray-50">
          <Map />
        </div>
      </div>
    </main>
  );
};

export default Home;
