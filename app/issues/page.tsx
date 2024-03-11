import {
  IssueStatusBadge,
  Link,
} from '@/app/components'
import NextLink from 'next/link'
import { Box, Table } from '@radix-ui/themes'

import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import IssueActions from './IssueActions'
import { ArrowUpIcon } from '@radix-ui/react-icons'
 
const IssuesPage = async ({searchParams}: { searchParams: {status: Status, orderBy: keyof Issue}}) => {
  const columns: { 
    label:string, 
    value:keyof Issue,
    className?: string
  } [] = [
    { label: 'Issue', value: 'title'},
    { label: 'Description', value: 'description', className: 'hidden md:table-cell'},
    { label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    { label: 'Created', value: 'createdAt', className: 'min-w-[150px] hidden md:table-cell'}
  ] 
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
  ? searchParams.status : undefined
   

  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  });

  return (
    <Box className="space-y-4">
        <IssueActions />
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row>
              {
                columns.map(column => (
                  <Table.ColumnHeaderCell key={column.label} className={column.className}>
                    <NextLink href={{
                      query: {...searchParams, orderBy: column.value}
                    }}>
                      {column.label}
                    </NextLink>
                    {column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>}
                  </Table.ColumnHeaderCell>
                ))
              }
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues?.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell> 
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status}/>
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.description}</Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status}/>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>View</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

        </Table.Root>

     </Box>
  )
}

export default IssuesPage