
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyUser } from "@/helperFuncs/functions"
export const GET = async (req: NextRequest) => {

    const token = cookies().get('token')
    const { valid, email, userId, user } = await verifyUser(token?.value as string)

    if (!valid) {
        return NextResponse.json({
            msg: "Invalid user"
        }, {
            status: 401
        })
    }
   

    return NextResponse.json({
        success: true,
        email,
        userId,
        isPaid: user?.isPaid,
        freeRemaining: user?.freeTrials
    }, {
        status: 200
    })

}