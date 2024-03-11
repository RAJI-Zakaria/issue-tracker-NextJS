import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import WhatIsNextJS from "./components/WhatIsNextJS";

export default async function Home({searchParams} : {searchParams:{page: string}}) {
  const countOpenIssues = await prisma?.issue.count ({
    where: {
      status: 'OPEN'
    }
  })  || 0
  const countDoneIssues = await prisma?.issue.count ({
    where: {
      status: 'DONE'
    }
  })  || 0
  const countInProgressIssues = await prisma?.issue.count ({
    where: {
      status: 'IN_PROGRESS'
    }
  })  || 0

  return (
    <>
    <LatestIssues/>
    <IssueSummary open={countOpenIssues} done={countDoneIssues} inProgress={countInProgressIssues} />
    <IssueChart open={countOpenIssues} done={countDoneIssues} inProgress={countInProgressIssues} />
    <WhatIsNextJS />
    </>
  );
}
