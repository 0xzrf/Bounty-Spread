import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType } from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;

    const name = searchParams.get('name')
    const description = searchParams.get('description')
    const submitText = searchParams.get('submitText')
    const questionArr= searchParams.get('questionArr')
    const rawArr = questionArr?.split('|')
    const objArr = rawArr?.map((item) => {
        return JSON.parse(item)
    })

    // objArr = [{type: "text", text: "Enter your name"}, {type: "text", text: "Enter your email"}, {type: "text", text: "Enter your phone number"}]
    // questionArr == "{type: "", text: ""}| ......"
    //@ts-ignore
    let params: ActionParameter[] = [];
    for (let i=0; i < (objArr?.length as number); i++){
        params.push({
            type: objArr?.[i]?.type,
            label: objArr?.[i]?.text,
            name: `question${i}` as string,
            required: true
        })
    }
    

    const res: ActionGetResponse = { 
        title: name as string,
        description: description as string,
        label: submitText as string,
        disabled: true,
        icon: "https://images.unsplash.com/photo-1726503454447-6c67b92dcc52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
        links: {
            actions: [
                {
                    href: `/api/app/trialBounty?name=${name}&description=${description}&submitText=${submitText}&questionArr=${questionArr}`,
                    label: submitText as string,
                    parameters: params,
                }
            ]
        }
    }

    return NextResponse.json(res,{
        headers: ACTIONS_CORS_HEADERS
    })
}

export async function OPTIONS(req: Request) {
    return new Response(null, { headers: ACTIONS_CORS_HEADERS })
}

