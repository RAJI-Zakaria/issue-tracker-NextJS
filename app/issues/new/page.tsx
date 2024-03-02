'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

import "easymde/dist/easymde.min.css";
import axios from 'axios';
import  { useForm , Controller, Form} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
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
  return (
    <div 
    className='max-w-xl space-y-3 items-center'>
        {
            error && 
            <Callout.Root color='red'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>
        }
        <form 
            onSubmit={onSubmit}>

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