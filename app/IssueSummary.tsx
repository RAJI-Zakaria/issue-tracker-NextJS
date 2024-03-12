import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    open: number
    inProgress: number 
    done: number
}

const IssueSummary = ({open, inProgress, done}: Props) => {
    const containers: {
        label:string
        value:number
        status:Status
    } []= [
        {label: 'Open Issues', value: open, status: 'OPEN'},
        {label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS'},
        {label: 'Done Issues', value: done, status: 'DONE'}
    ]
  return (
    <Flex gap='4'>
        {
            containers.map(({label, value, status}) => (
                <Card key={status} >
                    <Flex direction='column' gap='2'>
                        <Link className='text-sm font-medium' href={`/issues?status=${status}`}>{label}</Link>
                        <Text size='5' className='font-bold'>{value}</Text>
                    </Flex>
                </Card>
            ))
        }
    </Flex>
  )
}

export default IssueSummary