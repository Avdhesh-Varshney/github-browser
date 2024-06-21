import SearchForm from "../components/shared/SearchForm";
import Image from "next/image";
import mainImage from '../assets/main-img.webp'

export default function Home() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex flex-col gap-10">
      <SearchForm />
      <Image src={mainImage} alt='main-github-image' width={0} height={0} sizes='100vw' />
    </div>
  );
}
