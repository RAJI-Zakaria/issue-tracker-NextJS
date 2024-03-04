import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

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
        <h1>{issue.title}</h1>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>

    </div>
  )
}

export default IssueDetailsPage