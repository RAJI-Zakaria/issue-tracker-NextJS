/* eslint-disable @next/next/no-async-client-component */
'use client'
import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'), 
    { 
        ssr: false //do not render on the server
    })

import {
    ErrorMessage,
    Spinner,
} from '@/app/components';

import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>
 

const IssueForm = async({issue}: {issue?: Issue}) => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)
    
    const onSubmit = handleSubmit(async (data)=>{
        try{
            setSubmitting(true)
            if(issue)
                await axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post('/api/issues', data)

            router.push('/issues')
            router.refresh()
        }catch(e){
            setSubmitting(false)
            setError('an unexpected error occurred')
        }
    })

    
  return (
    <div 
    className='max-w-xl space-y-3 items-center mx-auto'>
        <h2>Create a new issue</h2>
        {
            error && 
            <Callout.Root color='red'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>
        }
        <form 
            onSubmit={onSubmit}
            className="space-y-4">

            <TextField.Root>
                <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage> 
            <Controller 
                defaultValue={issue?.description}
                name='description'
                control={control}
                render={({field}) => <SimpleMDE {...field} />}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage> 
            <Button className='cursor-pointer' disabled={isSubmitting}>{issue ? 'Edit Issue' : 'Submit New Issue'} 
                {isSubmitting && <Spinner />}
            </Button>

        </form>
    </div>
  )
}

export default IssueForm