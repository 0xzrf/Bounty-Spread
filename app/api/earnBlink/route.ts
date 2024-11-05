import { NextRequest, NextResponse } from "next/server";
import {
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";


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
  

  const response: ActionGetResponse = {
    icon: "https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    title: "Something",
    label: "Ignored",
    description: "This is soething",
    links: {
      actions: [
        {
          href: `/api/earnBlink`,
          label:  "Button",
        },
      ],
    },
  };

  return NextResponse.json(response, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export async function POST(req: NextRequest) {
    const response = {
        externalLink: `https://x.com/`,
        type: 'external-link',
    }
  return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });

}


export async function OPTIONS(req: Request) {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
