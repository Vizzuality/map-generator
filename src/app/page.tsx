import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  return (
    <main className="flex h-full items-stretch">
      <div className="flex w-96 flex-col overflow-auto">
        <ScrollArea>
          <h1>Setting up the layer</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            magni praesentium asperiores, commodi beatae ex atque mollitia quam
            laboriosam necessitatibus aliquid odio corrupti perspiciatis
            consequatur alias fuga, obcaecati cupiditate aut?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            aliquid ab omnis itaque tempora, nemo animi consequuntur incidunt
            fuga temporibus rerum molestias vitae beatae hic nostrum maiores non
            nobis nulla!
          </p>
        </ScrollArea>
      </div>
      <div className="grow">Preview of the map</div>
    </main>
  );
}
