import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction, Keypair } from "@solana/web3.js";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType, LinkedAction, createPostResponse } from "@solana/actions";
import { prisma } from "@/lib/utils";
import { number } from "zod";
import { BN, Program, web3 } from "@coral-xyz/anchor";
import IDL from "@/app/components/app/programData/idl.json";
import { DispenserProgram } from "@/app/components/app/programData/type";
const idlObject = JSON.parse(JSON.stringify(IDL))
const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/OT4gR7dGMvcc2SUrdEm4RCtrq0j2YkUL");
const program = new Program<DispenserProgram>(idlObject, {
    connection
})

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
            escrow_id: true,
            usernames: true,
            hostId: true
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
                        href: `/api/app/dispActions?id=${id}&escrow_id=${userData?.escrow_id}&hostId=${userData?.hostId}`,
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
    console.log("started the post request of dispAction")
    const id = searchParams.get("id");
    const escrowId = searchParams.get("escrow_id");
    let hostId:number | string = searchParams.get("hostId") as string;
    hostId = parseInt(hostId as string)
    const escrowIdBN = new BN(parseInt(escrowId as string))
    const user = new PublicKey(userKey);

    const bountyInfo = await prisma.bounties.findFirst({
        where: {
            id: id as string
        },
        select: {
            claimed: true,
            winners: true
        }
    })

    if (bountyInfo?.claimed.length == bountyInfo?.winners.length) {
        await prisma.$transaction(async(txn) => {
            await txn.bountySubmissions.deleteMany({
                where: {
                    bountyId: id as string
                }
            })

            await txn.bounties.delete({
                where: {
                    id: id as string
                }
            })
        })

       
        return NextResponse.json({
            transaction: "serialTx",
            message: "Bounty finished"
        }, {
            headers: ACTIONS_CORS_HEADERS,
            status: 403
        })
    }
    if (bountyInfo?.claimed.includes(userKey)) {
        return NextResponse.json({
            transaction: "serialTx",
            message: "Already claimed"
        }, {
            headers: ACTIONS_CORS_HEADERS,
            status: 403
        })
    }


    try {
        const hostInfo = await prisma.host.findFirst({
            where: {
                id: hostId
            },
            select: {
                publicKey: true
            }
        })
        const hostBuffer = new PublicKey(hostInfo?.publicKey as string)
        const [escrowPda, escrowBump] = await web3.PublicKey.findProgramAddress(
            [Buffer.from("escrow"), hostBuffer.toBuffer(), escrowIdBN?.toArrayLike(Buffer, "le", 8)], 
            program.programId
          );
          const [vaultPda, vaultBump] = await web3.PublicKey.findProgramAddress(
            [Buffer.from("escrow_vault"), hostBuffer.toBuffer(), escrowIdBN.toArrayLike(Buffer, "le", 8)],
            program.programId
          );

        const ix = await program.methods.withdrawPrize(escrowIdBN, new PublicKey(userKey))
          .accountsStrict({
            escrow: escrowPda,
            escrowVault: vaultPda,
            winner: new PublicKey(userKey),
            systemProgram: web3.SystemProgram.programId,
          })
          .instruction()
          const blockhash = await connection
          .getLatestBlockhash({ commitment: "max" })
          .then((res) => res.blockhash);
        const messageV0 = new web3.TransactionMessage({
          payerKey: new PublicKey(userKey),
          recentBlockhash: blockhash,
          instructions: [ix],
        }).compileToV0Message();
        const transaction = new web3.VersionedTransaction(messageV0);

        await prisma.bounties.update({
            where: {
                id: id as string
            },
            data: {
                claimed: {
                    push: userKey
                },

            }
        })

          const response: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: "Claimed reward"
            }
          })

          return NextResponse.json(response, {
            headers: ACTIONS_CORS_HEADERS
          });

    } catch (err) {
        console.error("An error occured", err)
        return NextResponse.json({
            transaction: "serialTx",
            message: "Failed to claim reward"
        }, {
            headers: ACTIONS_CORS_HEADERS,
            status: 403
        })
    }
}

export async function OPTIONS(req: Request) {
    return new Response(null, { headers: ACTIONS_CORS_HEADERS })
}


