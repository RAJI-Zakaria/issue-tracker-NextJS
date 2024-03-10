import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

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

    await delay(2000)
    
  return (
    <Grid columns={{initial:"1", md:"5"}} gap="5">
       <Box className='lg:col-span-4'>
            <IssueDetails  issue={issue}/>
       </Box>
       <Box>
           <Flex direction='column' gap='2'>
            <EditIssueButton issueId={issue.id}/>    
            <DeleteIssueButton issueId={0} />
           </Flex>
        </Box>


    </Grid>
  )
}

export default IssueDetailsPage