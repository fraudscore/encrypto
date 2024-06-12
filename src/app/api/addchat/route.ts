import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers';
import { decrypt } from "../register/route";
import DecryptedToken from "@/types/types";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(params: Request) {
    try {
        const body = await params.json();
        const { addChatUserEmail } = body;

        const cookieStore = cookies();
        const sessiontoken = cookieStore.get('sessiontoken');
        let decryptedToken: null | DecryptedToken = null;

        if (sessiontoken?.value) {
            decryptedToken = decrypt(sessiontoken.value) as DecryptedToken;
            console.log('Decrypted token:', decryptedToken);
        }

        if (!decryptedToken) {
            console.error('Unauthorized: no decrypted token');
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!decryptedToken.email) {
            console.error('Invalid decrypted token, missing email');
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: decryptedToken.email
            }
        });

        if (!currentUser) {
            console.error('User not found with email:', decryptedToken.email);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const otherUser = await prisma.user.findUnique({
            where: {
                email: addChatUserEmail
            }
        });

        if (!otherUser) {
            console.error('Other user not found with email:', addChatUserEmail);
            return NextResponse.json({ error: "Other user not found" }, { status: 404 });
        }

        const newChat = await prisma.privateChat.create({
            data: {
                users: {
                    connect: [
                        { email: currentUser.email },
                        { email: otherUser.email }
                    ]
                }
            }
        });

        return NextResponse.json({ chatId: newChat.id });
    } catch (error) {
        console.error('Error creating chat:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
