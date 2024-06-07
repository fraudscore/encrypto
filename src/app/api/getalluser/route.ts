import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const searchQuery = searchParams.get('query') || '';
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: searchQuery, // Remove 'mode' to make it compatible with your Prisma version
            },
        },
        skip,
        take: limit,
    });

    const totalUsers = await prisma.user.count({
        where: {
            username: {
                contains: searchQuery, // Remove 'mode' to make it compatible with your Prisma version
            },
        },
    });

    const validatedUsers: any[] = users.map((user) => [
        { "username": user.username },
        { "email": user.email },
        { "profilepicture": user.profilepicture }
    ]);

    return NextResponse.json({ users: validatedUsers, totalUsers }, { status: 200 });
}
