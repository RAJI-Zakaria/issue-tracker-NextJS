import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({issueId} : {issueId:number}) => {
  return (
    <Link className='!cursor-pointer' href={`/issues/${issueId}/edit`}>
    <Button className='w-full' variant="soft" >
      <Pencil2Icon />
      Edit Issue
    </Button>
  </Link>
  )
}

export default EditIssueButton