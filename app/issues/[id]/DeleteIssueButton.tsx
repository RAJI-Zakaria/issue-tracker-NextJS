'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const DeleteIssueButton = ({issueId}: {issueId:number}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
          <CrossCircledIcon/>
          delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content className='space-y-3'>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? this action cannot be undone.
        </AlertDialog.Description>
        <Flex gap='4'>
          <AlertDialog.Action>
            <Button variant='surface' color='red'>Delete</Button>
          </AlertDialog.Action>
          <AlertDialog.Action >
            <Button>Cancel</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton