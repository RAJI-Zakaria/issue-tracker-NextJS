'use client'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Callout } from '@radix-ui/themes'

const DBInfo = () => {
  return (
    <Callout.Root color="red" role="alert" mb='4'>
    <Callout.Icon>
      <ExclamationTriangleIcon />
    </Callout.Icon>
    <Callout.Text>
      Please note that, i am using a limited database with limited connections and it may not be available all the time.
    </Callout.Text>
  </Callout.Root>
  )
}

export default DBInfo