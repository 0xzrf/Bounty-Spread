import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType } from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";


export const GET = (req: NextRequest) => {
    let res: ActionGetResponse;
    const { searchParams } = req.nextUrl;

    const id = searchParams.get('id')

    switch(id) {
        case "web2":
            res = {
                icon: "https://d70djocle7hv2.cloudfront.net//uploads/17/0.09625719222477236/image.jpg",
                title: "WEB-2 COHORT",
                label: "BUY COURSE",
                description: "Step into the world of web with kirat's expertise.Develop high-performance website with heavy backend logic."                            };
            break;
        case "web3":
            res = {
                icon: "https://d70djocle7hv2.cloudfront.net//uploads/17/0.12165001681660059/image.jpg",
                title: "WEB-3 COHORT",
                label: "BUY COURSE",
                description: "Comphrensive web3 knowledge packed with decoded blockchain jargon.Beginner friendly but even advanced devs can get some value out of it."
            };
            break;
        case "ml":
            res = {
                icon: "https://d70djocle7hv2.cloudfront.net//uploads/17/0.4954685644869543/image.jpg",
                title: "MACHINE LEARNING",
                label: "GET THE COURSE",
                description: "Get the ground-up knowledge of ML to get industry-ready.Build high-definition projects showcasing your proficiency."                
            };
            break;
        }
    //@ts-ignore
    return NextResponse.json(res, {
        headers: ACTIONS_CORS_HEADERS
    })

    
}

export async function OPTIONS(req: Request) {
    return new Response(null, { headers: ACTIONS_CORS_HEADERS })
}


