import { Skeleton } from '@/app/components'
import { Box, Card, Flex, Heading } from '@radix-ui/themes'

const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>
        <Heading><Skeleton/></Heading>
        <Flex gap="4" my="2">
            <Skeleton width="5rem"/>
            <Skeleton width="8rem"/>
        </Flex>
        <Card className="prose" mt="4">
            <Skeleton/>
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailsPage