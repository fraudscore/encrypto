import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10); // Standardbegrenzung auf 5 geändert
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
        skip,
        take: limit,
    });

    const validatedUsers: any[] = users.map((user) => [
        { "username": user.username },
        { "email": user.email },
        { "profilepicture": user.profilepicture }
    ]);

    return NextResponse.json({ users: validatedUsers }, { status: 200 });
}
