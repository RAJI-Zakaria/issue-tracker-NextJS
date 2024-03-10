'use client'
import React from 'react'
import Link from 'next/link'
import { PiBugFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    const {status, data:session}  = useSession();
    const links = [
        {
            label: 'Dashboard',
            href: '/'
        },
        {
            label: 'Issues',
            href: '/issues'
        }
    ]
  return (
    <nav className="border-b mb-5 px-5 py-3 h-14">
        <Container>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                    <Link href="/">
                        <PiBugFill  size={25} />
                    </Link>
                    <ul className='flex space-x-8'>
                        {
                            links.map((link) => (
                                <li key={link.href}>
                                    <Link className={classNames({
                                        'text-zinc-700' : currentPath === link.href,
                                        'text-zinc-500' : currentPath !== link.href,
                                        'hover:text-zinc-700 transition hover:text' : true
                                    })} href={link.href}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </Flex>
                <Box>
                {
                    status === 'authenticated' && session && ( 
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar size='2' src={session?.user!.image!} fallback="?" className='cursor-pointer'/>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Label>
                                    {session?.user?.name}
                                </DropdownMenu.Label>
                                <DropdownMenu.Item>
                                    <Link href='/api/auth/signout'>Sign out</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    )
                }
                {
                    status === 'unauthenticated' && (
                        <Link href='/api/auth/signin'>
                            Sign in
                        </Link>
                    )
                }
            </Box>
            </Flex>
        </Container>
    </nav>
  )
}

export default NavBar