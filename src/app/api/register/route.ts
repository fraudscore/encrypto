import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, browser_agend, ip_address, password, sessiontoken } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: email,
                browser_agend: browser_agend,
                ip_address: ip_address,
                password: hashedPassword,
                sessiontoken: sessiontoken
            }
        });

        return NextResponse.json({ "email": email });
    } catch (err) {
        console.error(err);  
        return NextResponse.json({ "Message": "error" }, { status: 500 });
    }
}
