import prisma from '@/prisma/client';
import delay from 'delay';
import IssueTable from '../components/IssueTable';
import IssueActions from './IssueActions';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);

  return (
    <div className='max-w-[700px] w-[100%]' >
      <IssueActions />
      <IssueTable issues={issues} />
    </div>
  )
}
export const dynamic = 'force-dynamic';

export default IssuesPage;
