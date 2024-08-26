import jwt from "jsonwebtoken"
import { prisma } from "@/lib/utils"
import nacl from "tweetnacl"
import { verifySignature } from "@/helperFuncs/functions"
import { cookies } from "next/headers"
const JWT_SECRET = process.env.JWT_SECRET

export const POST = async (req: Request) => {
    const { pubKey, signature }: any = await req.json();
    if (!pubKey || !signature) {
        return Response.json({
            msg: "Please provide valid inputs"
        })
    }

    const { isSuccess, msg } = await verifySignature(pubKey, signature)
    if (!isSuccess) {
        return Response.json({
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
        return Response.json({
            msg: "No user with your private key exists",
            redirect: true
        }, {
            status: 401
        })
    }

    const token = jwt.sign({ email: isUser.email }, JWT_SECRET as string)

    cookies().set("token", token)

    return Response.json({
        msg: "Successfully Signed in",
        success: true,
        token
    }, {
        status: 200
    })

}