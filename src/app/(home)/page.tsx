import Banner from "./components/Banner";
import SearchForm from "./components/SearchForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-20">
      <SearchForm />
      <Banner />
    </main>
  );
}
