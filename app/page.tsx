import { Button, Flex, Text } from '@radix-ui/themes'
import { IssueStatusBadge } from './components';
import prisma from '@/prisma/client';
import Link from 'next/link';

const DashboardPage = async () => {
  const issuesInProgress = await prisma.issue.findMany({
    where: {
      status: "IN_PROGRESS",
    },
  });

  const closedIssues = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
    },
  });

  const openedIssues = await prisma.issue.findMany({
    where: {
      status: "OPEN",
    },
  });

  return (
    <section className='w-[100%]'>

      <Flex className='flex justify-center items-center'>
        <Text size='8'>
          Your Dashboard
        </Text>
      </Flex>

      <Flex className='w-[100%]  flex-col justify-between gap-5  mt-5 border border-slate-700 p-4 rounded-md' >

        <Flex className='w-[100%] flex-row items-center '
          style={{ justifyContent: 'space-between' }}>
          <div className='flex gap-3 items-center'>
            <IssueStatusBadge status='OPEN' />
            <Text size='3'>
              {' '}
              {openedIssues.length} issues
            </Text>
          </div>
          <Link href='/issues/status/open'>
            <Button style={{ marginLeft: '4px', width: '207px' }} >
              View All Opened Issues
            </Button>
          </Link>
        </Flex>

        <Flex className='w-[100%] flex-row items-center '
          style={{ justifyContent: 'space-between' }}>
          <div className='flex gap-3 items-center'>
            <IssueStatusBadge status='IN_PROGRESS' />
            <Text size='3'>
              {' '}
              {issuesInProgress.length} issues
            </Text>
          </div>
          <Link href='/issues/status/progress'>
            <Button style={{ marginLeft: '4px', width: '207px' }} >
              View All In Progress Issues
            </Button>
          </Link>
        </Flex>

        <Flex className='w-[100%] flex-row items-center '
          style={{ justifyContent: 'space-between' }}>
          <div className='flex gap-3 items-center'>
            <IssueStatusBadge status='CLOSED' />
            <Text size='3'>
              {' '}
              {closedIssues.length} issues
            </Text>
          </div>
          <Link href='/issues/status/closed'>
            <Button style={{ marginLeft: '4px', width: '207px' }} >
              View All Closed Issues
            </Button>
          </Link>
        </Flex>

      </Flex>
    </section>
  )
}

export default DashboardPage;