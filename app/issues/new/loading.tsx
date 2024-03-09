import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'


const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl  mx-auto">
        Loading....
        <Skeleton/> 
        <Skeleton height="20rem"/> 
    </Box>
  )
}

export default LoadingNewIssuePage