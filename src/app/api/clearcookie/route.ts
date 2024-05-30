import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(req: Request){
    const cookieStore = cookies()
    if(cookieStore.get("sessiontoken")){
        cookies().delete('sessiontoken')
        return NextResponse.json({}, {status: 200})

    }
}