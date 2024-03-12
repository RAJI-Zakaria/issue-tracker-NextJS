import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const statusMap : Record<Status, {label:string, color:'red'|'violet'|'green'}> = {
    OPEN: { label: 'Open', color: 'green' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    DONE: { label: 'Closed', color: 'red' },

}
const IssueStatusBadge = ({status}:{ status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>
        {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge