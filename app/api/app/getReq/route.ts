import { NextRequest, NextResponse } from "next/server";
import {ACTIONS_CORS_HEADERS} from "@solana/actions"
export const POST = async (req: NextRequest) => {
    const {searchParams} = req.nextUrl;

    const questions =   searchParams.getAll("question0");
    console.log(questions)

    return NextResponse.json(null, {
        headers: ACTIONS_CORS_HEADERS
    })
}

export async function OPTIONS(req: Request){
    return new Response(null,{headers: ACTIONS_CORS_HEADERS})
}
