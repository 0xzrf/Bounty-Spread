import nacl from "tweetnacl"

import jwt, { JwtPayload } from "jsonwebtoken"
import { PublicKey } from "@solana/web3.js"
import { prisma } from "@/lib/utils"

const JWT_SECRET = process.env.JWT_SECRET

export function verifySignature(pubKey: String, signature: any) {
    try {
        const signatureString = "You're a verified exceliWorker"
        const stringEncoded = new TextEncoder().encode(signatureString)
        const sign = new Uint8Array(Object.values(signature));
        const pubkey = new PublicKey(pubKey).toBytes()

        const result = nacl.sign.detached.verify(
            stringEncoded,
            sign,
            pubkey
        )

        if (!result) {
            return { isSuccess: true, msg: "" }
        }

    } catch (err: any) {
        return { isSuccess: false, msg: err.message }
    }
    return { isSuccess: true, msg: "" }

}

export async function verifyUser(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
        const user = await prisma.host.findFirst({
            where: {
                email: decoded.email
            }
        })

        return { valid: true, email: decoded.email, userId: user?.id }

    } catch (err) {
        return { valid: false }
    }
}