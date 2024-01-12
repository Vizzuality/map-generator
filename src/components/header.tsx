import Export from '@/components/export';

const Header = () => (
  <header className="flex h-[50px] w-full shrink-0 items-center justify-between border-b px-4">
    <h1>Tocapu</h1>
    <div>
      <Export />
    </div>
  </header>
);

export default Header;
