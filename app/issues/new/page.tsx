'use client'
import { Button, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

import "easymde/dist/easymde.min.css";
import axios from 'axios';
import  { useForm , Controller, Form} from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IssueForm{
    title: string;
    description: string;
}
const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();
    console.log(register('title'))
  return (
    <form 
        className='max-w-xl space-y-3 items-center' 
        onSubmit={handleSubmit(async (data)=>{
            await axios.post('/api/issues', data)
            router.push('/issues')
        })}>

          <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')} />
          </TextField.Root>
          <Controller 
            name='description'
            control={control}
            render={({field}) => <SimpleMDE {...field} />}
          />
            <Button >Submit</Button>

    </form>
  )
}

export default NewIssuePage