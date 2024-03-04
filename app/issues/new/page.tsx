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
} from '@/app/components'

import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import delay from 'delay';

type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = async() => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)
    
    const onSubmit = handleSubmit(async (data)=>{
        try{
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        }catch(e){
            setSubmitting(false)
            setError('an unexpected error occurred')
        }
    })

    await delay(3000)
    
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
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage> 
            <Controller 
                name='description'
                control={control}
                render={({field}) => <SimpleMDE {...field} />}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage> 
                <Button disabled={isSubmitting}>Submit New Issue 
                    {isSubmitting && <Spinner />}
                </Button>

        </form>
    </div>
  )
}

export default NewIssuePage