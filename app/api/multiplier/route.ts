import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    
    return NextResponse.json({ muliplier: randomNumber });
}