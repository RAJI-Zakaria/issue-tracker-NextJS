'use client'
import { Avatar, Box, Button, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiBugFill } from "react-icons/pi";
import {Skeleton} from '@/app/components'
import { DropdownMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Image from 'next/image';

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const toggleAvatarMenu = () => {
    setAvatarMenuOpen(!isAvatarMenuOpen);
  };
    
  return (

<nav className="bg-gray-800">
<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  <div className="relative flex h-16 items-center justify-between">
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      {/* <!-- Mobile menu button--> */}
      <button onClick={toggleMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
        <span className="absolute -inset-0.5"></span>
        <span className="sr-only">Open main menu</span>
        {/* <!--
          Icon when menu is closed.

          Menu open: "hidden", Menu closed: "block"
        --> */}
        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        {/* <!--fff
          Icon when menu is open.

          Menu open: "block", Menu closed: "hidden"
        --> */}
        <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex flex-shrink-0 items-center">
        <Link href="/">
            <PiBugFill className='text-white' size={25} />
        </Link>
      </div>
      <div className="hidden sm:ml-6 sm:block">
        <NavigationLinks type="desktop"/>
      </div>
    </div>
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">View notifications</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </button>

      {/* <!-- Profile dropdown --> */}
      <div className="relative ml-3" >
       <AuthStatus />
      </div>
    </div>
  </div>
</div>

{/* <!-- Mobile menu, show/hide based on menu state. --> */}
<div className="hidden" id="mobile-menu"  style={{ display: isMenuOpen ? 'block' : 'none' }}>
  <NavigationLinks type="mobile"  />
  
</div>
</nav>
  )
}


const NavigationLinks = ({type}: {type:string})=>{
    const currentPath = usePathname();
    const links = [
        {
            label: 'Dashboard',
            href: '/'
        },
        {
            label: 'Issues',
            href: '/issues'
        },
        {
            label: 'What is NextJS',
            href: '/what-is-nextjs'
        }
    ]
    return (
        <>
        {
        type === "mobile" ?
        <div className="space-y-1 px-2 pb-3 pt-2 block md:hidden">
          {
            links.map((link) => (
              <Link key={link.href}  
                href={link.href}
                className={classNames({
                  " block rounded-md px-3 py-2 text-base font-medium": true,
                  'bg-gray-900 text-white' : currentPath === link.href,
                  'text-gray-300 hover:bg-gray-700 hover:text-white' : currentPath !== link.href,
              })} >
              {link.label} 
                </Link>
            ))
          }
      
        </div>
        :


        <div className="flex space-x-4">
          {
            links.map((link) => (
              <Link key={link.href}  
                href={link.href}
                className={classNames({
                  "rounded-md px-3 py-2 text-sm font-medium": true,
                  'bg-gray-900 text-white' : currentPath === link.href,
                  'text-gray-300 hover:bg-gray-700 hover:text-white ' : currentPath !== link.href,
              })} >
              {link.label} 
                </Link>
            ))
          }
        </div>
      }

      


        </>
        
    )
}





const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton width='1.5rem' height='1.5rem'/>;
    if (status === "unauthenticated") return <Link className='nav-link' href='/api/auth/signin'>Sign in</Link>;
    return (
        <>
      
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar
                            size='2'
                            src={session!.user!.image!}
                            fallback="?"
                            className='cursor-pointer'
                            referrerPolicy='no-referrer'
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            {session!.user!.name!} 
                        </DropdownMenu.Label>
                        <DropdownMenu.Item>
                            <Link href='/api/auth/signout'>Sign out</Link>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
          
        </>
    )
}
export default NavBar