import { cookies } from 'next/headers'

export async function GET(params:Request) {
    const cookieStore = cookies()
}