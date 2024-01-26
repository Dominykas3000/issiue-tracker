import IssueTable from "@/app/components/IssueTable"
import prisma from "@/prisma/client"
import { Text } from '@radix-ui/themes'


const openIssuePage = async () => {

  const openedIssues = await prisma.issue.findMany({
    where: {
      status: "OPEN",
    },
  })

  return (
    <section className='flex flex-col w-[100%] justify-center gap-5'>
      <Text size='6' className='text-center'>Opened Issues</Text>
      <IssueTable issues={openedIssues} />
    </section>
  )
}

export default openIssuePage