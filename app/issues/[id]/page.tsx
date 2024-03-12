
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import { cache } from "react";
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface Props{
    params: {
        id: string
    }
}

const fetchUser = cache((issueId: number)=> prisma.issue.findUnique({
    where: {
        id: issueId
    }
}))

const IssueDetailsPage = async ({params}: Props) => {
    const session = await getServerSession(authOptions);
    if (isNaN(Number(params.id)))
        notFound()
    
    const issue = await  fetchUser(parseInt(params.id))   
    if(!issue)
        notFound()

    
  return (
    <Grid columns={{initial:"1", md:"5"}} gap="5">
       <Box className={session ? 'lg:col-span-4' : 'lg:col-span-5'}>
            <IssueDetails  issue={issue}/>
       </Box>
      {
        session && (
        <Box>
            <Flex direction='column' gap='2'>
                <AssigneeSelect issue={issue} />
                <EditIssueButton issueId={issue.id}/>    
                <DeleteIssueButton issueId={issue.id} />
            </Flex>
        </Box>
        )
      }


    </Grid>
  )
}

export async function generateMetadata({params}: Props){
    const issue = await fetchUser(parseInt(params.id))

    return {
        title: issue?.title,
        description: 'Details of the issue '+ issue?.id
    }
}

export default IssueDetailsPage