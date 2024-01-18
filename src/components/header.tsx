import Export from '@/components/export';

const Header = () => (
  <header className="flex h-[50px] w-full shrink-0 items-center justify-between border-b px-4">
    <div className="flex items-center space-x-2">
      <h1 className="text-lg font-semibold">Tocapu</h1>
      <div className="text-md text-gray-500">is a map generator for designers</div>
    </div>
    <div>
      <Export />
    </div>
  </header>
);

export default Header;
