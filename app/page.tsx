import type { Metadata } from "next";

import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import DBInfo from "./components/DBInfo";

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
    <DBInfo />
    <Grid columns={{ initial: "1", md: "2" }} gap='3'> 
      <Flex direction="column" gap='3'>
        <IssueSummary open={countOpenIssues} done={countDoneIssues} inProgress={countInProgressIssues} />
        <IssueChart open={countOpenIssues} done={countDoneIssues} inProgress={countInProgressIssues} />
      </Flex>
      <LatestIssues/>
    </Grid>

    </>
  );
}


export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the issue tracker'
}