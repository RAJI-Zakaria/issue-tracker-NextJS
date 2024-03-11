'use client'
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({issue}: {issue:Issue}) => {
    const {data:users, error, isLoading} = useUsers();

    const assignIssue = (userId: string) => {
        axios.patch(`/api/issues/${issue.id}`, {assignedToUserId: userId === "unassigned" ? null : userId} ).catch(()=>{
            toast.error('Failed to assign user')
        })
    }

    if (isLoading) return <Skeleton/>
    if (error) return <Select.Root>error : fetching users list...</Select.Root>

    //---> old boring method using useEffect & useState
    // const [users, setUsers] = useState<User[]>([])
    // useEffect (()=>{
    //     const fetchUsers = async () => {
    //         const {data} = await axios.get<User[]>('/api/users')
    //         setUsers(data)
    //     }

    //     fetchUsers()
    // },[])
  return (
   <>
    <Select.Root 
    defaultValue={issue.assignedToUserId || "unassigned"}
    onValueChange={assignIssue}>
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value='unassigned'>Unassigned</Select.Item>
                {
                    users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))
                }
            </Select.Group>
        </Select.Content>
    </Select.Root> 

    <Toaster>
    </Toaster>
   
   </>
    )
}


const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: ()=> axios.get<User[]>('/api/users').then(res=>res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3
})

export default AssigneeSelect