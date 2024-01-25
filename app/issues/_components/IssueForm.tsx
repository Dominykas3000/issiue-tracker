'use client';

import { IssueStatusBadge } from '@/app/components';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Flex, TextField, Text } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
// });

type IssueForm = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      setError('');
      if (issue) await axios.patch('/api/issues/' + issue.id, data);
      else await axios.post('/api/issues', data);
      router.push('/issues');
      router.refresh();
    }
    catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  const handleStatusChange = (selectedValue: string) => {
    setValue('status', selectedValue as "OPEN" | "IN_PROGRESS" | "CLOSED");
  };


  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder='Title'
            {...register('title')} />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Flex className='justify-start flex-col gap-6'>
          <section className='flex flex-col gap-3'
            style={{
              border: '1px solid black',
              borderRadius: '0.375rem',
            }}>
            <select className="inline-flex items-center justify-center rounded-md px-4 text-sm leading-none h-9 gap-3 bg-white"
              {...register('status')}
              onChange={(e) => handleStatusChange(e.target.value)}
              defaultValue={issue?.status}
              style={{ margin: '4px 6px' }}
              aria-label="Status">
              <option value="OPEN" className='text-red-600 bg-red-300'>
                Open
              </option>
              <option value="IN_PROGRESS" className='color'>
                In progress
              </option>
              <option value="CLOSED">
                Closed
              </option>
            </select>
          </section>


          <Button disabled={isSubmitting}>
            {issue ? 'Update Issue' : 'Submit New Issue'} {' '}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div >
  )
}

export default IssueForm