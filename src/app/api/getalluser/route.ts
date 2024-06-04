import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const users = await prisma.user.findMany();
    const validatedUsers: any[] = [];

    for (let i = 0; i < users.length; i++) {
        validatedUsers.push([{"username": users[i].username}, {"email": users[i].email}, {"profilepicture": users[i].profilepicture}]);
    }

    console.log(validatedUsers);
    return NextResponse.json({ users: validatedUsers }, { status: 200 });
}