import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv, pbkdf2Sync } from "crypto";
import { log } from "console";
import { cookies } from 'next/headers'


const prisma = new PrismaClient();


const derivedKey = pbkdf2Sync(process.env.ENCRYPTION_KEY!, "salt", 1000, 32, "sha256");

export const encrypt = (value: any): string | null => {
  try {
    const text = typeof value === "object" ? JSON.stringify(value) : value;
    const cipher = createCipheriv("aes-256-ecb", derivedKey, null);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  } catch (error) {
    process.env.NODE_ENV === "production" && log(error);
    return null;
  }
};

export const decrypt = <T = string>(encryptedText: string): T | null => {
  if (typeof encryptedText !== "string") return null;
  try {
    const decipher = createDecipheriv("aes-256-ecb", derivedKey, null);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    try {
      return JSON.parse(decrypted) as T;
    } catch (error) {
      return decrypted as any;
    }
  } catch (error) {
    process.env.NODE_ENV === "production" && log(error);
    return null;
  }
};


function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidIPAddress(ipAddress: string): boolean {
    const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;

    if (ipv4Pattern.test(ipAddress) || ipv6Pattern.test(ipAddress)) {
        return true;
    } else {
        return false;
    }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, useragent, password, ip } = body;
        if(!isValidEmail(email)){
            return NextResponse.json({"error": "Not a valid email provided"})
        }
        if(!isValidIPAddress(ip)){
            return NextResponse.json({"error": "Invalid Ip Address"})
        }
        const existingUser = await prisma.user.findUnique({ where: { email: email } });
        if (existingUser !== null) {
            return NextResponse.json({ "error": "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({
            data: {
                email: email,
                useragent: useragent,
                ip: ip,
                password: hashedPassword,
            }
        });

        const sessiontoken: any = encrypt(JSON.stringify(user))
        cookies().set({
            name: 'sessiontoken',
            value: sessiontoken,
            httpOnly: true,
            path: '/',
          })
        return NextResponse.json({ "email": email, "sessiontoken": sessiontoken });
    } catch (err) {
        console.error(err);  
        return NextResponse.json({ "Message": "error" }, { status: 500 });
    }
}
