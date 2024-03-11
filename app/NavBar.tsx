'use client'
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiBugFill } from "react-icons/pi";
import {Skeleton} from '@/app/components'

const NavBar = () => {
   
  return (
    <nav className="border-b mb-5 px-5 py-3 h-14">
        <Container>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                    <Link href="/">
                        <PiBugFill  size={25} />
                    </Link>
                    <NavigationLinks/>
                </Flex>
                <AuthStatus />
            </Flex>
        </Container>
    </nav>
  )
}


const NavigationLinks = ()=>{
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
        <ul className='flex space-x-8'>
            {
                links.map((link) => (
                    <li key={link.href}>
                        <Link className={classNames({
                            'nav-link': true,
                            '!text-zinc-800' : currentPath === link.href,
                        })} href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}





const AuthStatus = () => {
    const { status, data: session } = useSession();
    if (status === "loading") return <Skeleton width='1.5rem' height='1.5rem'/>;
    if (status === "unauthenticated") return <Link className='nav-link' href='/api/auth/signin'>Sign in</Link>;
    return (
        <>
            <Box>
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
            </Box>
        </>
    )
}
export default NavBar