import type { Metadata } from "next";

import {
  Pagination
} from '@/app/components';
import { Flex } from '@radix-ui/themes';

import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';

 
interface Props{
  searchParams: IssueQuery
}

const IssuesPage = async ({searchParams}: Props) => {
   
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
  ? searchParams.status : undefined

  const where = {status}
   
  const orderBy = columnNames
  .includes(searchParams.orderBy)
  ? {[searchParams.orderBy]: 'asc'}
  : undefined

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 4;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page-1) * pageSize,
    take: pageSize
  });


  const issueCount = await prisma.issue.count({where})

  return (
    <Flex direction='column' gap='3'>
        <IssueActions />
          <IssueTable searchParams={searchParams} issues={issues} />
          <Pagination 
            pageSize={pageSize}
            itemCount={issueCount}
            currentPage={page}
          />
     </Flex>
  )
}


export const metadata: Metadata = {
  title: 'Issues',
  description: 'List of issues'
}

export default IssuesPage
