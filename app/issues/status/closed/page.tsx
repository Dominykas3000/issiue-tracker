import IssueTable from "@/app/components/IssueTable"
import prisma from "@/prisma/client"
import { Text } from '@radix-ui/themes'


const closedIssuePage = async () => {

  const closedIssues = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
    },
  })

  return (
    <section className='flex flex-col w-[100%] justify-center gap-5'>
      <Text size='6' className='text-center'>Closed Issues</Text>
      <IssueTable issues={closedIssues} />
    </section>
  )
}

export default closedIssuePage