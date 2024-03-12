import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueStatusBadge } from './components'

const LatestIssues = async() => {
    const latestIssues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc'},
        take: 5,
        include: {
            assignedToUser: true
        }
    })


  return (
    <Card>
        <Heading size="6" mb="5">Latest Issues</Heading>
        <Table.Root>
            <Table.Body>
                {
                    latestIssues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                            <Flex justify='between'>
                                    <Flex direction='column' align='start' gap='2'>
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status}/>
                                    </Flex>

                            {
                                    issue.assignedToUser && (
                                        <Avatar src={issue.assignedToUser.image!} alt={issue.assignedToUser.name!} fallback='?' />
                                    ) || <Avatar src='/unknown.png' alt="Unassigned" fallback='?' />
                            }
                            </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table.Root>
    </Card>
  )
}

export default LatestIssues