import LatestIssues from "./LatestIssues";
import Pagination from "./components/Pagination";
import WhatIsNextJS from "./components/WhatIsNextJS";

export default function Home({searchParams} : {searchParams:{page: string}}) {
  return (
    <>
    <LatestIssues/>
    <WhatIsNextJS />
    </>
  );
}
