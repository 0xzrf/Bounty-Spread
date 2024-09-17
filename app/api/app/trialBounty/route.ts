import { ActionGetResponse } from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export const GET = async (req: NextRequest) => {
    const bounty = await req.json();
    console.log(bounty);

    return NextResponse.json({bounty});
}