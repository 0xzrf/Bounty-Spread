import { NextRequest, NextResponse } from "next/server";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  ActionParameter,
  ActionParameterType,
} from "@solana/actions";
import { prisma } from "@/lib/utils";
import axios from "axios";

interface STBody {
  listingId: string;
  link: string;
  tweet: string;
  otherInfo: string;
  ask: null;
  eligibilityAnswers: null;
  email: string;
}
export const runtime = "edge";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");
  const userData = await prisma.bounties.findFirst({
    where: {
      id: id as string,
    },
    select: {
      description: true,
      name: true,
      amount: true,
      type: true,
      questions: true,
      types: true,
      interval: true,
      imageUrl: true,
      isActive: true,
      isVerified: true,
      submitText: true,
    },
  });

  if (!userData) {
    const response: ActionGetResponse = {
      description: "No such bounty found",
      icon: "https://imgs.search.brave.com/4jrmq74DXMRXOQoamba5WnCwQPlmckEnsjQkEnBib7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU1/Mzg0OTMzL3Bob3Rv/L2NvbXB1dGVyLXNo/b3dpbmctYW4tZXJy/b3ItbWVzc2FnZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/c05UdTlCQW81OEhP/MkZOSWpzRXNuTWY1/X2R0S2ZPSVVoUGNj/VzR1Nml0Zz0",
      title: "404 Not found :(",
      label: "No Such submission",
      disabled: true,
      error: {
        message: "No such bounty is active! Please check the blink properly",
      },
    };
    return NextResponse.json(response, {
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  if (!userData.isActive) {
    const response: ActionGetResponse = {
      description: "Submission closed",
      icon: "https://imgs.search.brave.com/4jrmq74DXMRXOQoamba5WnCwQPlmckEnsjQkEnBib7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU1/Mzg0OTMzL3Bob3Rv/L2NvbXB1dGVyLXNo/b3dpbmctYW4tZXJy/b3ItbWVzc2FnZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/c05UdTlCQW81OEhP/MkZOSWpzRXNuTWY1/X2R0S2ZPSVVoUGNj/VzR1Nml0Zz0",
      title: "404 Not found :(",
      label: "Submission closed",
      disabled: true,
      error: {
        message: "Submission for this Bounty has been closed by the Host",
      },
    };
    return NextResponse.json(response, {
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  // @ts-ignore
  let params: ActionParameter[] = [];
  let ques = [];

  params.push({
    type: "email",
    label: "Give your email Id",
    name: "email",
    required: true,
  });

  for (let i = 0; i < (userData?.questions.length as number); i++) {
    params.push({
      type: userData?.types[i].toLowerCase() as ActionParameterType,
      label: userData?.questions[i] as string,
      name: `question${i}` as string,
      required: true,
    });
    ques.push(`question${i}`);
  }
  let str = "";
  ques.map((ele) => {
    str += `{${ele}}|`;
  });

  let imageUrl = userData?.imageUrl || "https://wallpapercave.com/wp/wp9800926.jpg";

  const response: ActionGetResponse = {
    icon: imageUrl as string,
    title: userData?.name as string,
    label: "Ignored",
    description: userData?.description as string,
    links: {
      actions: [
        {
          href: `/api/app/actions?id=${id}&email={email}&data=${str}`,
          label:  userData?.submitText as string,
          parameters: params,
        },
      ],
    },
  };

  return NextResponse.json(response, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export async function POST(req: NextRequest) {
  const postRequest: ActionPostRequest = await req.json();
  const userKey = postRequest.account;
  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;

  const { searchParams } = req.nextUrl;

  const email = searchParams.get("email");
  console.log("email", email);

  const id = searchParams.get("id");
  console.log("id:", id);
  let questions: string | null = searchParams.get("data");
  console.log(questions);

  console.log(questions?.split("|").slice(0, -1));

  const answer: string[] = questions?.split("|").slice(0, -1) as string[];
  const user = new PublicKey(userKey);

  let serialTx: string;
  try {
    const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/OT4gR7dGMvcc2SUrdEm4RCtrq0j2YkUL");
    const ix = SystemProgram.transfer({
      fromPubkey: user,
      toPubkey: new PublicKey("9Y3AbEzFsfdBy9FFVy4oSnQbiNT6uLKw2nc8CxUboDnm"),
      lamports: 100,
    });
    const tx = new Transaction();
    tx.feePayer = user;
    const bh = (
      await connection.getLatestBlockhash({ commitment: "finalized" })
    ).blockhash;
    console.log(`blockhash ${bh}`);
    tx.recentBlockhash = bh;
    serialTx = tx
      .serialize({ requireAllSignatures: false, verifySignatures: false })
      .toString("base64");
      
      
      const question = await prisma.bounties.findFirst({
        where: {
          id: id as string,
        },
        select: {
          questions: true,
        },
      });
      
      await prisma.bountySubmissions.create({
        data: {
        bountyId: id as string,
        candidPubKey: userKey,
        question: question?.questions as string[],
        answers: answer,
      },
    });

  console.log(userKey);

  const response: ActionPostResponse = {
    transaction: serialTx ,
    message: "Form submitted!!",
  };
  
  return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });
} catch(err:any) {
  console.log(err.message)
  return NextResponse.json( {
      transaction: "serialTx" ,
      message: "Error please check",
    }, {
      headers: ACTIONS_CORS_HEADERS
    })
}
}


export async function OPTIONS(req: Request) {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
