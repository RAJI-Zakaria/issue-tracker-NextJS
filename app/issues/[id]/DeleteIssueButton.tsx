'use client'
import { Spinner } from '@/app/components'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({issueId}: {issueId:number}) => {
  const router = useRouter();
  const [error, setError] = useState(false)
  const [isDeleting, setDeleting] = useState(false)

  const deleteIssue = async()=>{
    try{
      setDeleting(true)
      //throw new Error('show error popup');
      await axios.delete(`/api/issues/${issueId}`)
    
      router.push('/issues')
      router.refresh()
    }catch(e){
      setError(true)
      setDeleting(false)
    }

  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled= {isDeleting} className='cursor-pointer'>
            <CrossCircledIcon/>
            delete
            {isDeleting && <Spinner/> }
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className='space-y-3'>
          <AlertDialog.Title>Delete Issue {issueId}</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? this action cannot be undone.
          </AlertDialog.Description>
          <Flex gap='4'>
            <AlertDialog.Action>
              <Button variant='surface' color='red' onClick={deleteIssue}>Delete</Button>
            </AlertDialog.Action>
            <AlertDialog.Action >
              <Button>Cancel</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            An error occurred while deleting the issue
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button variant='surface' onClick={()=>setError(false)}>Close</Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton