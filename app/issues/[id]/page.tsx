import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
    <Grid columns={{initial:"1", md:"2"}} gap="5">
       <Box>
            <IssueDetails  issue={issue}/>
       </Box>
       <Box>
           <EditIssueButton issueId={issue.id}/>    
        </Box>


    </Grid>
  )
}

export default IssueDetailsPage