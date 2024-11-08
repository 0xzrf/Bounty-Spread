import { NextRequest, NextResponse } from "next/server";
import {
  ActionGetResponse,
  ActionPostRequest,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";

import { prisma } from "@/lib/utils";

export const runtime = "edge";

export const GET = async (req: NextRequest) => {

  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");
  const link = searchParams.get("link");

  const bountyData = await prisma.bounties.findFirst({
    where:{
      id: id as string
    }
  });
  
  const response: ActionGetResponse = {
    icon: bountyData?.imageUrl as string,
    title: bountyData?.name as string,
    label: "Ignored",
    description: bountyData?.description as string,
    links: {
      actions: [
        {
          href: `/api/earnBlink?link=${link as string}`,
          label: "Link to the Bounty",
        },
      ],
    },
  };

  return NextResponse.json(response, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export async function POST(req: NextRequest) {

  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  const body:ActionPostRequest = await req.json();


  const link = searchParams.get("link");

  await prisma.bountySubmissions.create({
    data: {
      bountyId: id as string,
      candidPubKey: body.account,
      question: [],
      answers: [],
    }
  })
  
    const response = {
        externalLink: link,
        type: 'external-link',
    }
  return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });

}

export async function OPTIONS(req: Request) {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
