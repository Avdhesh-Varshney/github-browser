import Banner from "./components/Banner";
import SearchForm from "../../components/shared/SearchForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-20">
      <SearchForm />
      <Banner />
    </div>
  );
}
