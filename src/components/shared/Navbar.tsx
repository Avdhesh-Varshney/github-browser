import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../app/favicon.ico';

const Navbar = () => {

  return (
    <nav className="w-full shadow-lg bg-[#181918]">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={logo}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: 'auto' }}
                className="bg-white rounded-full"
              />
            </div>
            <span className="text-xl font-bold uppercase tracking-tight text-primary-500">
              GitHub Browser
            </span>
          </div>
        </Link>

        <button className="h-10 rounded-md border px-4 py-2 text-sm font-medium bg-white text-black transition-all hover:bg-black hover:text-white active:bg-black active:text-white">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
