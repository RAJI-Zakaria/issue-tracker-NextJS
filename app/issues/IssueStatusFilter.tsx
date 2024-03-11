'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import { useSearchParams } from 'next/navigation'

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const status = searchParams.get('status')


    const statuses: {label:string, value?: Status}[] = [
        {label: 'All'},
        {label: 'Open', value: 'OPEN'},
        {label: 'In Progress', value: 'IN_PROGRESS'},
        {label: 'Done', value: 'DONE'}
        

    ]
  return (
    <Select.Root 
    defaultValue={status? status : 'all'}
    onValueChange={(status)=>{
        const query = status === 'all' ? '' : `?status=${status}` 
        router.push('/issues'+query)
    }}>
        <Select.Trigger placeholder='Filter by status...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Filter by status</Select.Label>
                {
                    statuses.map(status => (
                        <Select.Item key={status.label} value={status.value || 'all'}>{status.label}</Select.Item>
                    ))
                }
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter