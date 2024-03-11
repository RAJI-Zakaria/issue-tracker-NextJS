import type { Metadata } from "next";

import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

interface Props {
    params: {
        id: string
    }

}

const EditIssuePage = async ({params}:Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!issue)
        notFound()

    
  return (
    <IssueForm issue={issue}/>
  )
}
export const metadata: Metadata = {
    title: 'Edit Issue',
    description: 'Edit an issue'
}
export default EditIssuePage