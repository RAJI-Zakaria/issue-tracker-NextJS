'use client'
import React from 'react'
import Link from 'next/link'
import { PiBugFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath)
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
    <nav className="flex space-x-8 border-b mb-5 h-14 items-center">
        <Link href="/">
            <PiBugFill/>
        </Link>
        <ul className='flex space-x-8'>
            {
                links.map((link) => (
                    <li key={link.href}>
                        <Link className={`${link.href === currentPath ? 'text-zinc-800' : 'text-zinc-400' }  hover:text-zinc-800`} href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))
            }

        </ul>
    </nav>
  )
}

export default NavBar