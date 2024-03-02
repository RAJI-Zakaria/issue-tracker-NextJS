import React from 'react'
import Link from 'next/link'

const NavaBar = () => {
  return (
    <nav className="flex space-x-8 border-b mb-5 h-14 items-center">
        <Link href="/">Zak&apos;s Logo</Link>
        <ul className='flex space-x-8'>
            <li>
                <Link href="/">Dashboard</Link>
            </li>
            <li>
                <Link href="/issues">Issues</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavaBar