"use server"
import nacl from "tweetnacl"

import jwt from '@tsndr/cloudflare-worker-jwt'
import { PublicKey } from "@solana/web3.js"
import { prisma } from "@/lib/utils"
import { cookies } from "next/headers"
import { Stringifier } from "postcss"
const JWT_SECRET = process.env.JWT_SECRET

export async function verifySignature(pubKey: String, signature: any): Promise<{ isSuccess: boolean, msg: string }> {
    try {
        const signatureString = "You're signing in to BountySpread"
        const stringEncoded = new TextEncoder().encode(signatureString)
        let sign
        if (!signature.data) {
            sign = new Uint8Array(Object.values(signature))
        } else {
            sign = new Uint8Array(signature.data)
        }
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
    return { isSuccess: false, msg: "Something" }
}

export async function verifyUser(token: string) {
    try {
        const { payload } = jwt.decode(token as string)
        
        const user = await prisma.host.findFirst({
            where: {
                //@ts-ignore
                email: payload?.email
            }
        })
        const userId = user?.id;
    
        return {valid: true, email: user?.email, userId, user}
        
    } catch (err: any) {
        console.log(err);
        return {valid: false}
    }
}

export async function deleteCookie() {
    cookies().delete("token")
}

export async function getCookie() {
    try {
        const cookie = cookies().get("token")
        console.log(cookie?.value)
    }
    catch (err) {
        console.log("fucked up cookie", err)

    }
}