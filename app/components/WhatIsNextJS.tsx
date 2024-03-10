import { Box, Button, Container, Grid, Heading, Link, Section, Text, Code } from '@radix-ui/themes';


const WhatIsNextJS = () => {
  return (
    <Box>
        <Section py='5'> 
            <Heading mb='3'>What is Next.js</Heading>
            <Text>
            Next JS is a framework for building fast and search-engine friendly applications it&apos;s build on React. react is just a library while NextJS is framework -- multiple libraries
            </Text>
            <Text>
            NextJS pillars :
            <ul className="list-disc ml-10">
                <li>Compiler : transform and minify JS code</li>
                <li>CLI : build and start apps</li>
                <li>Node.js Runtime : Execute JS code</li>
                <li>write js that meant to be execute out of your browsers server side =`{'>'}` Full-Stack DEV (learn once write everywhere).</li>
                <li>Server-side rendering</li>
                <li>Static Site generation</li>
            </ul>
            </Text> 
        </Section>
        


        <Section py='5'>  
                <Heading mb='3'>Project Structure</Heading>
                <ul>
                    <li><Code>/app</Code>container for our router system (create files and folder representing our routes)</li>
                    <li><Code>/components</Code> reusable components</li>
                    <li><Code>/pages</Code> pages of our app</li>
                    <li><Code>/public</Code> static files like images</li>
                    <li><Code>/styles</Code> global styles</li>
                    <li><Code>/utils</Code> helper functions</li>
                </ul>
                Configuration files <Code>tsconfig.json</Code>, <Code>next.config.js</Code>... 
        </Section>
        


        <Section py='5'> 
                <Heading mb='3'>Routing and Navigation</Heading>
                <Text>The route system is based on convention not configuration</Text>
                <Text>Example : create a route users</Text>
                <ul>
                    <li>create a folder <Code>users</Code></li>
                    <li>Create <Code>page.{'ts,tsx,js,jsx'}</Code> inside the users folder</li>
                </ul>
        </Section>

    </Box>
  )
}

export default WhatIsNextJS




