import jwt from "jsonwebtoken"
import { prisma } from "@/lib/utils"
import nacl from "tweetnacl"
import { verifySignature } from "@/app/api/helperFuncs/functions"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
const JWT_SECRET = process.env.JWT_SECRET

export const runtime = 'edge';

export const POST = async (req: NextRequest) => {
    const { pubKey, signature }: any = await req.json();
    if (!pubKey || !signature) {
        return NextResponse.json({
            msg: "Please provide valid inputs"
        })
    }

    const { isSuccess, msg }: { isSuccess: boolean, msg: string } = await verifySignature(pubKey, signature)
    if (!isSuccess) {
        return NextResponse.json({
            msg
        }, {
            status: 403
        })
    }

    const isUser = await prisma.host.findFirst({
        where: {
            publicKey: pubKey
        }
    })

    if (!isUser) {
        return NextResponse.json({
            msg: "No user with your private key exists",
            redirect: true
        }, {
            status: 401
        })
    }

    const token = jwt.sign({ email: isUser.email }, JWT_SECRET as string)

    cookies().set("token", token)

    return NextResponse.json({
        msg: "Successfully Signed in",
        success: true,
        token
    }, {
        status: 200
    })

}