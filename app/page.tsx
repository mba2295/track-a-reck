import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <main>
      <Pagination
        currentPage={2}
        pageSize={20}
        itemCount={100}
        key={1}
      ></Pagination>
    </main>
  );
}
