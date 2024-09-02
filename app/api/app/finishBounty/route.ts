import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/app/api/helperFuncs/functions";
import { prisma } from "@/lib/utils";
import { cookies } from "next/headers";

export const runtime = "edge"

export const POST = async (req: NextRequest) => {
    const {id} : {id: string} = await req.json();
    
    if (!id) {
        return NextResponse.json({
            msg:"Invalid Bounty request"
        })
    }
    const token = cookies().get("token");
    const {valid, userId} = await verifyUser(token?.value as string);

    if(!valid) {
        return NextResponse.json({
            msg: "Invalid User"
        })
    }

    try{

        await prisma.bounties.update({
            where: {
                id
            },
            data: {
                isActive: false
            }
        })
        
        return NextResponse.json({
            msg: "Successfully Finished the Bounty! Check it out on the \"Dispense Bounties\" tab",
            success :true
        })


    }catch(err: any) {
        console.log(err);
        return NextResponse.json({
            msg: "Internal server error"
        }, {
            status: 403
        })
    }


}