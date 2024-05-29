import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';


const prisma = new PrismaClient();

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift() as string, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
}

function generateUUID(): string {
    let d = new Date().getTime(); 
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); 
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, browser_agend, ip_address, password } = body;
        if(!isValidEmail(email)){
            return NextResponse.json({"error": "Not a valid email provided"})
        }

        const sessiontoken = generateUUID();
        const encrypted_sessiontoken = encrypt(sessiontoken)

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: email,
                browser_agend: browser_agend,
                ip_address: ip_address,
                password: hashedPassword,
                sessiontoken: encrypted_sessiontoken
            }
        });

        return NextResponse.json({ "email": email, "sessiontoken": encrypted_sessiontoken });
    } catch (err) {
        console.error(err);  
        return NextResponse.json({ "Message": "error" }, { status: 500 });
    }
}
