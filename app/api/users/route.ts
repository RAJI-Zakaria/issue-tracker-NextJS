import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"
export async function GET(request: NextRequest){ //we don't need request, but we need to keep it to avoid caching the endpoint
    const users = await prisma.user.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    return NextResponse.json(users)
}