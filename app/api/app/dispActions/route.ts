import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType, LinkedAction } from "@solana/actions";
import { prisma } from "@/lib/utils";
import { number } from "zod";
import { BN, Program, web3 } from "@coral-xyz/anchor";
import IDL from "@/app/components/app/programData/idl.json";
import { DispenserProgram } from "@/app/components/app/programData/type";

interface STBody {
    listingId: string,
    link: string,
    tweet: string,
    otherInfo: string,
    ask: null,
    eligibilityAnswers: null,
    email: string
}
export const runtime = 'edge';

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get('id')
    console.log(":::", id);
    const userData = await prisma.bounties.findFirst({
        where: {
            id: id as string
        },
        select: {
            description: true,
            name: true,
            amount: true,
            interval: true,
            imageUrl: true,
            isActive: true,
            isVerified: true,
            winners: true,
            prizes: true,
            usernames: true
        }
    })

    if (!userData) {
        const response: ActionGetResponse = {
            description: "No such bounty found",
            icon: "https://imgs.search.brave.com/4jrmq74DXMRXOQoamba5WnCwQPlmckEnsjQkEnBib7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU1/Mzg0OTMzL3Bob3Rv/L2NvbXB1dGVyLXNo/b3dpbmctYW4tZXJy/b3ItbWVzc2FnZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/c05UdTlCQW81OEhP/MkZOSWpzRXNuTWY1/X2R0S2ZPSVVoUGNj/VzR1Nml0Zz0",
            title: "404 Not found :(",
            label: "No Such submission",
            disabled: true,
            error: {
                message: "No such bounty is active! Please check the blink properly"
            }
        }
        return NextResponse.json(response, {
            headers: ACTIONS_CORS_HEADERS
        })
    }

    let actions = [] as LinkedAction[];

    for (let i = 0; i < userData?.winners.length; i++) {
        actions.push({
            href: `/api/app/actions?id=${id}}`,
            label: `${userData?.winners[i].slice(0, 3) + "..." + userData?.winners[i].slice(40, -1)}`,
        })
    }

    try {
        const response: ActionGetResponse = {
            icon: userData?.imageUrl as string,
            title: userData?.name as string,
            label: "Ignored",
            description: `Congratulations to all the winners! || Respective winners can claim their prizes: ${userData?.usernames.join(", ")}`,
            links: {
                actions: [
                    {
                        href: `/api/app/dispActions?id=${id}`,
                        label: "Claim Prize",
                    }
                ]
            }
        }

        return NextResponse.json(response
            , {
                headers: ACTIONS_CORS_HEADERS
            })

    } catch (err) {
        return NextResponse.json({
            message: err
        }, {
            headers: ACTIONS_CORS_HEADERS
        })
    }

}

export async function POST(req: NextRequest) {
    const postRequest: ActionPostRequest = await req.json();
    const userKey = postRequest.account;

    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    console.log("id:", id);

    const user = new PublicKey(userKey);

    const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/OT4gR7dGMvcc2SUrdEm4RCtrq0j2YkUL");
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


