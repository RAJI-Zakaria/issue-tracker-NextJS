import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params}: {params :{ id: string }}){

    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    
        
    const body = await req.json()
    const validation = issueSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status:400})
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if(!issue)
        return NextResponse.json({ error: 'Issue not found'}, {status:404})

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    })
    

    return NextResponse.json(updatedIssue)
}


export async function DELETE(req: NextRequest, {params}: {params :{ id: string }}){

    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    
        
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if(!issue)
        return NextResponse.json({ error: 'Issue not found'}, {status:404})

    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })

    
    return NextResponse.json({message: 'Issue deleted'})
}

