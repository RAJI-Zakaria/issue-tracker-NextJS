import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

interface Props{
    params: {
        id: string
    }
}

const IssueDetailsPage = async ({params}: Props) => {
    if (isNaN(Number(params.id)))
        notFound()
    
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if(!issue)
        notFound()
  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex gap="4" my="2">
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
            <p>{issue.description}</p>
        </Card>
        <p>{issue.status}</p>

    </div>
  )
}

export default IssueDetailsPage