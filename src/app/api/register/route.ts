import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, ip } = body;
        return NextResponse.json({ "email": email });
    } catch (err) {
        return NextResponse.json({ "Message": "error" }, { status: 500 });
    }
}
