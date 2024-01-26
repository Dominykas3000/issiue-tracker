import { Link, Table } from "@radix-ui/themes"
import IssueActions from "../issues/IssueActions"
import { IssueStatusBadge } from "@/app/components"

interface IssueTableProps {
  issues: Issue[]
}

interface Issue {
  id: number
  title: string
  description: string
  status: "OPEN" | "IN_PROGRESS" | "CLOSED"
  createdAt: Date
  updatedAt: Date
}


const IssueTable = (props: IssueTableProps) => {
  const { issues } = props;

  return (
    <div className='max-w-[700px] w-[100%]' >

      <Table.Root className="w-[100%]" variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell className='w-[50%]  truncate	max-w-[100px]'>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table.Root >
    </div>
  )
}

export default IssueTable
