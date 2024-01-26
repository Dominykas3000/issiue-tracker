import { Text } from '@radix-ui/themes'
import IssueTable from '../../../components/IssueTable'
import prisma from '@/prisma/client'

const inProgressPage = async () => {

  const issuesInProgress = await prisma.issue.findMany({
    where: {
      status: "IN_PROGRESS",
    },
  })

  return (
    <section className='flex flex-col w-[100%] justify-center gap-5'>
      <Text size='6' className='text-center'>In Progress Issues</Text>
      <IssueTable issues={issuesInProgress} />
    </section>
  )
}

export default inProgressPage