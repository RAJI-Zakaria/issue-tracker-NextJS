'use client'
import React from 'react'
import Link from 'next/link'
import { PiBugFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

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
    <nav className="flex space-x-8 border-b mb-5 px-4 h-14 items-center">
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
        <Box>
            {
                status === 'authenticated' && session && ( 
                    <Link href='/api/auth/signout'>
                        Sign out
                    </Link>
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
    </nav>
  )
}

export default NavBar