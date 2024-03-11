import Pagination from "./components/Pagination";
import WhatIsNextJS from "./components/WhatIsNextJS";

export default function Home({searchParams} : {searchParams:{page: string}}) {
  return (
    <>
    <WhatIsNextJS />
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />
    </>
  );
}
