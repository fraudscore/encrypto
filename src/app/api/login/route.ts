import { encrypt } from "../register/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { log } from "console";
import { cookies } from 'next/headers'


const prisma = new PrismaClient();


export async function POST(params:Request) {
    console.log("test")
   const body = await params.json()
   const {email, password} = body
   const user = await prisma.user.findUnique({
    where: {
        email: email
    }
   })

   if (!user) {
    return NextResponse.json({"message": "Invalid email or password"}, { status: 400 });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if(passwordMatch){
    console.log("Password Match")
    const sessiontoken: any = encrypt(JSON.stringify(user))
    cookies().set({
        name: 'sessiontoken',
        value: sessiontoken,
        httpOnly: true,
        path: '/',
      })
    return NextResponse.json({"message": "Login success"}, {status: 200})
  }
}