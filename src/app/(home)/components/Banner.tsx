import React from 'react'
import mainImage from '../../../assets/main-img.webp';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className='w-screen md:w-3/4 items-center flex justify-center'>
      <Image src={mainImage} alt='main-github-image' width={0} height={0} sizes='100vw' style={{ width: 'auto', height: 'auto' }} className='w-screen md:w-3/4 mt-5' />
    </div>
  )
}

export default Banner
