import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const {type, name, description, interval, questions} : {
        type: string,
        name: string,
        description: string,
        interval: string,
        questions : {
            question: string,
            type: string
        }[]
    } = await req.json();

    if (!(type || name || description || interval || !(questions.length == 0))){
        return NextResponse.json({
            msg:"Wrong inputs"
        }, {
            status: 403
        })
    }

    if (type == "Project") {
        


    } 
    if (type == "Grant"){

    }
    if (type == "Bounty"){
        
    }


}