import React from 'react'
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Done', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge className='justify-center w-[87px] h-[33.6px] text-center'
      color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge;