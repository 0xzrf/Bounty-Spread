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
        icon: "https://d70djocle7hv2.cloudfront.net//uploads/1/0.9516079316753869/image.jpg",
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

