import type { Metadata } from "next";

import { WhatIsNextJS } from '@/app/components';

const WhatIsNextJSPPage = () => {
  return (
    
    <WhatIsNextJS />
  )
}
export const metadata: Metadata = {
    title: 'What is Next.js?',
    description: 'Learn about Next.js'
}
export default WhatIsNextJSPPage