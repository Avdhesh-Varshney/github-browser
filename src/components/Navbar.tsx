import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../app/favicon.ico';

const Navbar = () => {
  return (
    <nav>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4'>
        <div>
          <Link href="/">
            <div className='flex items-center gap-1'>
              <div className='relative'>
                <Image src={logo} alt='logo' width={0} height={0} sizes='100vw' style={{width: 'auto', height: 'auto'}} className='bg-white rounded-full' />
              </div>
              <span className='text-xl font-bol uppercase tracking-tight text-primary-500'>GitHub Browser</span>
            </div>
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <button className="h-10 rounded-md border px-4 py-2 text-sm font-medium text-primary-500 transition-all shadow-md hover:border-black hover:bg-white hover:text-black active:border-black active:bg-white active:text-black">
            Sign in
          </button>
          <button className="h-10 rounded-md border px-4 py-2 text-sm font-medium bg-white text-black transition-all hover:bg-black hover:text-white active:bg-black active:text-white">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
