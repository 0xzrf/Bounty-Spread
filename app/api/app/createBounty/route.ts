import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/utils";
import { verifyUser } from "@/helperFuncs/functions";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
    const { type, name, description, interval, questions, imageUrl, amount }: {
        type: "Grant" | "Project" | "Bounty",
        name: string,
        description: string,
        interval: string,
        questions: {
            question: string,
            type: "Text" | "Number" | "Email"
        }[],
        imageUrl: string,
        amount: number
    } = await req.json();
  
    const token = cookies().get("token")
    
    const { valid, userId } = await verifyUser(token?.value as string);

    if (!valid) {
        return NextResponse.json({
            msg: "Unauthorized! Please Sign in first"
        }, {
            status: 403
        })
    }

    if (!(type || name || description || interval || !(questions.length == 0))) {
        return NextResponse.json({
            msg: "Wrong inputs"
        }, {
            status: 403
        })
    }

    const questionsArr = questions.map((item) => item.question)
    const typeArr = questions.map((item) => item.type)
    try {
        await prisma.$transaction(async (tx) =>{
            await tx.bounties.create({
                data: {
                    description,
                    name,
                    interval: new Date(interval),
                    type,
                    questions: questionsArr,
                    hostId: userId as number,
                    types: typeArr,
                    imageUrl,
                    amount
                }
            })

            await tx.host.update({
                where: {
                    id: Number(userId)
                },
                data:{
                    freeTrials: {
                        decrement: 1
                    }
                }
            })
        })        

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            msg: err
        })
    }

    return NextResponse.json({
        success: true,
        msg: "Successfully created a blink"
    })
}