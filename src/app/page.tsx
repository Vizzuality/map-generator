import BasemapControl from '@/components/controls/basemap';
import LayerGeneratorControl from '@/components/controls/layer-generator';
import Map from '@/containers/map';
import Sidebar from '@/containers/sidebar';

const Home = () => {
  return (
    <main className="flex h-full items-stretch">
      <Sidebar>
        <BasemapControl />
        <LayerGeneratorControl />
      </Sidebar>

      <div className="grow p-4" id="preview">
        <div className="h-full w-full rounded border bg-gray-50">
          <Map />
        </div>
      </div>
    </main>
  );
};

export default Home;
