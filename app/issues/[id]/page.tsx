import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props{
    params: {
        id: string
    }
}

const IssueDetailsPage = async ({params}: Props) => {
    const session = await getServerSession(authOptions);
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
    <Grid columns={{initial:"1", md:"5"}} gap="5">
       <Box className={session ? 'lg:col-span-4' : 'lg:col-span-5'}>
            <IssueDetails  issue={issue}/>
       </Box>
      {
        session && (
        <Box>
            <Flex direction='column' gap='2'>
                <AssigneeSelect />
                <EditIssueButton issueId={issue.id}/>    
                <DeleteIssueButton issueId={issue.id} />
            </Flex>
        </Box>
        )
      }


    </Grid>
  )
}

export default IssueDetailsPage