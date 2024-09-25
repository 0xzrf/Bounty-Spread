import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";
import { verifyUser } from "../helperFuncs/functions";
import { cookies } from "next/headers";

export const runtime = 'edge';

export const GET = async () => {
    const token = cookies().get("token")
    const { valid, userId } = await verifyUser(token?.value as string);

    if (!valid) {
        return NextResponse.json({
            msg: "Unauthorized! Please Sign in first"
        }, {
            status: 403
        })
    }

    try {
        // Generate random bytes
        const randomBytes = new Uint8Array(32);
        crypto.getRandomValues(randomBytes);
        const string = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

        const dataHash = `${string}-${userId}`;

        // Create SHA-256 hash
        const encoder = new TextEncoder();
        const data = encoder.encode(dataHash);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const apiKey = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        const host = await prisma.host.update({
            where: {
                id: userId
            },
            data: {
                apiKey
            }
        })

        console.log(host);

        return NextResponse.json({
            apiKey,
            success: true
        }, {
            status: 200
        })
    } catch (err: any) {
        return NextResponse.json({
            msg: err.message
        }, {
            status: 500
        })
    }
}