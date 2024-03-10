import { Button } from '@radix-ui/themes'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const DeleteIssueButton = ({issueId}: {issueId:number}) => {
  return (
    <Button color='red'>
        <CrossCircledIcon/>
        <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>  
    </Button>
  )
}

export default DeleteIssueButton