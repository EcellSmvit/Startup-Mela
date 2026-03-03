import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

const prismaClient = () => {
    return new PrismaClient({adapter})
}

declare global{
    var prisma: undefined | ReturnType<typeof prismaClient>
}

const prisma = globalThis.prisma ?? prismaClient()

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = prisma
}

export default prisma