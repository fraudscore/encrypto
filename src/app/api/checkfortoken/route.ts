import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { cookies } from 'next/headers'

export async function GET(params:Request) {
    const cookieStore = cookies()
    const sessiontoken = cookieStore.get('sessiontoken')
    console.log(sessiontoken)
    if(sessiontoken){
        return NextResponse.json({"success": "token found"}, {status: 200})
    }else{
        return NextResponse.json({"failure": "token not found"}, {status: 400})
    }
}