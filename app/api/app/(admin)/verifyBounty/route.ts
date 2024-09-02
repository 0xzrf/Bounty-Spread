import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/app/api/helperFuncs/functions";
import { prisma } from "@/lib/utils";
import { cookies } from "next/headers";

export const runtime = "edge"

export const POST = async (req:NextRequest) => {
    const token = cookies().get("token");
    const {valid, userId} = await verifyUser(token?.value as string);
    const {id}:{id:string} = await req.json();
    
    if(!valid){
        return NextResponse.json({
            msg:"User is unauthorized"
        },{
            status: 403
        }) 
    }

    try{
        await prisma.bounties.update({
            where:{
                id
            },
            data:{
                isVerified: true,
                isActive: true
            }
        })

        return NextResponse.json({
            success: true
        })

    }catch(err){
        console.log(err);
        return NextResponse.json({
            msg: err
        },
    {
        status: 400
    })
    }
}