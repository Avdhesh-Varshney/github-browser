import SearchForm from "@/components/shared/SearchForm";
import Image from "next/image";
import light from '../assets/home-desktop-light.webp';
import dark from '../assets/home-desktop-dark.webp';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl">GitHub Browser</h1>
        <SearchForm text="GitHub" />
        <Image src={dark} alt='home-image' width={0} height={0} sizes='100vw' />
      </div>
    </div>
  );
}
