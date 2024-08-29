import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType } from "@solana/actions";
import { prisma } from "@/lib/utils";
import axios from "axios"

interface STBody {
    listingId: string,
    link: string,
    tweet: string,
    otherInfo: string,
    ask: null,
    eligibilityAnswers: null,
    email: string
}

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get('id')
    const userData = await prisma.bounties.findFirst({
        where: {
            id: parseInt(id as string)
        },
        select: {
            description: true,
            name: true,
            amount: true, 
            type: true, 
            questions: true,
            types: true,
            interval: true,
            imageUrl: true
        }
    })

    // @ts-ignore
    let params: ActionParameter[] = []
    let ques = [];

    params.push({
        type:"email",
        label:"Give your email Id",
        name:"email",
        required:true
    })

    for (let i = 0; i < (userData?.questions.length as number); i++) {
        params.push({
            type: userData?.types[i].toLowerCase() as ActionParameterType,
            label: userData?.questions[i] as string,
            name: `question${i}` as string,
            required: true
        })
        ques.push(`question${i}`)
    }
    let str = '';
    ques.map(ele => {
        str += `{${ele}}|`
    })

    const response: ActionGetResponse = {
        icon: userData?.imageUrl as string,
        title: userData?.name as string,
        label: "Ignored",
        description: userData?.description as string,
        links: {
            actions: [
                {
                    href: `/api/app/actions?id=${parseInt(id as string)}&email={email}&data=${str}`,
                    label: `Submit & win ${userData?.amount} USD`,
                    parameters: params,
                }
            ]
        }
    }

    return NextResponse.json(response
        , {
            headers: ACTIONS_CORS_HEADERS
        })
}

export async function POST(req: NextRequest) {
    const postRequest: ActionPostRequest = await req.json();
    const userKey = postRequest.account;
    const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;

    const { searchParams } = req.nextUrl;

    const email = searchParams.get("email");
    console.log("email",email);

    const id = searchParams.get("id");
    console.log(id);
    let questions: string | null = searchParams.get("data");
    console.log(questions)

    console.log(questions?.split("|").slice(0, -1), parseInt(questions?.split("|")[1] as string));

    const answer: string[] = questions?.split("|").slice(0,  -1) as string[];
    const user = new PublicKey(userKey);

    const formData: STBody = {
        ask: null,
        eligibilityAnswers: null,
        email: email as string,
        link: answer[0],
        tweet: answer[1],
        otherInfo: answer[2], 
        listingId: "94b22307-bc58-43c6-8cbf-8d9aa0c07996"
    }

    const connection = new Connection(clusterApiUrl("devnet"));
    const ix = SystemProgram.transfer({
        fromPubkey: user,
        toPubkey: new PublicKey("9Y3AbEzFsfdBy9FFVy4oSnQbiNT6uLKw2nc8CxUboDnm"),
        lamports: 100
    })
    const tx = new Transaction();
    tx.feePayer = user;
    const bh = (await connection.getLatestBlockhash({ commitment: "finalized" })).blockhash;
    console.log(`blockhash ${bh}`)
    tx.recentBlockhash = bh
    const serialTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");


    try {
        const questions = await prisma.bounties.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                questions: true
            }
        })

        await prisma.bountySubmissions.create({
            data: {
                bountyId: Number(id),
                candidPubKey: userKey,
                question: questions?.questions as string[],
                answers: answer
            }
        })
        const stSubmission = await axios.post(`${DEPLOYED_LINK_URL}/api/bountySpread/create`, formData);
        console.log("axios request sent");

    } catch (err) {
        console.error(err)
        return NextResponse.json({
            transaction: serialTx,
            message: "Failed to participate"
        }, {
            headers: ACTIONS_CORS_HEADERS,
            status: 403
        })
    }

    console.log(userKey);



    const response: ActionPostResponse = {
        transaction: serialTx,
        message: "Form submitted!!",

    }


    return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });
}

export async function OPTIONS(req: Request) {
    return new Response(null, { headers: ACTIONS_CORS_HEADERS })
}


