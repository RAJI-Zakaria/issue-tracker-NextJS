import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma


// import { PrismaClient } from "@prisma/client";
// //Best Practice...
// //this is the prisma client that will be used to interact with the database. It's a global variable so it can be imported and used in other files without having to
// //the instance we are creating will be cached and reused whenever needed.
// //Didn't know that!!!! thought that i had to using Singleton or something like that. 
// const prisma = new PrismaClient()


// export default prisma;
