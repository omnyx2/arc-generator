import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-2xl font-bold">Fancy Website</div>
        <ul className="flex space-x-8 text-white">
          <li>
            <Link href="/">
              <p className="hover:underline">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="hover:underline">About</p>
            </Link>
          </li>
          <li>
            <Link href="/generator">
              <p className="hover:underline">Generator</p>
            </Link>
          </li>
          <li>
            <Link href="/principle">
              <p className="hover:underline">Princicle</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
