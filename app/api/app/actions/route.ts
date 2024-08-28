import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType} from "@solana/actions";
import { prisma } from "@/lib/utils";

export const GET = async  (req: NextRequest) => {
    const {searchParams} = req.nextUrl;

    const id = searchParams.get('id')
    console.log(id, parseInt(id as string))
    const userData = await prisma.bounties.findFirst({
        where: {
            id: parseInt(id as string)
        },
        select: {
            description: true, //.
            name: true, //.
            amount: true, // how to show this on blink
            type: true, // grant/project/bounty
            questions: true, // array of questions
            types: true, // email/number/text
            interval: true, 
            imageUrl: true 
        }
    })

    // each question object contains a question and its type 
    // see type from frontend and just get the question.
    // @ts-ignore
    let params: ActionParameter[] = []
    let ques = [];
    
    for (let i = 0; i < (userData?.questions.length as number) ; i++) {
        params.push({
            type: userData?.types[i].toLowerCase() as ActionParameterType,
            label: userData?.questions[i] as string,
            name: `question${i}` as string,
            required: true
        })
        ques.push(`question${i}`)
    }
    console.log(ques);
    let str = '';
    ques.map(ele =>{
        str += `${ele}={${ele}}/` 
    })

    const response: ActionGetResponse = {
        icon: userData?.imageUrl as string,
        title: userData?.name as string,
        label: "Ignored",
        description: userData?.description as string,
        links: {
            actions:[
                {
                    href: `/api/app/actions?${str}`, 
                    label: "Submit SOL",
                    parameters: params,

                }
            ]
    }}
    
    return NextResponse.json(response
    ,{
        headers: ACTIONS_CORS_HEADERS
    })
}

export async function POST(req: NextRequest){
    const postRequest: ActionPostRequest = await req.json();
    const userKey = postRequest.account;

        const {searchParams} = req.nextUrl;

    const questions =   searchParams.getAll("question0");
    console.log(questions)


    console.log(userKey);
  
    const user = new PublicKey(userKey);
  
    const connection = new Connection(clusterApiUrl("devnet"));
    const ix = SystemProgram.transfer({
      fromPubkey: user,
      toPubkey: new PublicKey("9Y3AbEzFsfdBy9FFVy4oSnQbiNT6uLKw2nc8CxUboDnm"),
      lamports: 2
    })
    const tx = new Transaction();
    tx.feePayer = user;
    const bh = (await connection.getLatestBlockhash({commitment:"finalized"})).blockhash;
    console.log(`blockhash ${bh}`)
    tx.recentBlockhash = bh
    const serialTx = tx.serialize({requireAllSignatures:false,verifySignatures:false}).toString("base64");
  
    const response: ActionPostResponse = {
      transaction: serialTx,
      message:"hello "+userKey
    }
  
  
    return NextResponse.json(response, {headers: ACTIONS_CORS_HEADERS});
  }
  
  export async function OPTIONS(req: Request){
    return new Response(null,{headers: ACTIONS_CORS_HEADERS})
  }
  

