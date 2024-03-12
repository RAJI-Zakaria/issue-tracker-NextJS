import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'
import React from 'react'

interface Props {
    href: string
    children: React.ReactNode
}


const Link = ({href, children} : Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <RadixLink>
            {children}
        </RadixLink>
    </NextLink>
  )
}

export default Link