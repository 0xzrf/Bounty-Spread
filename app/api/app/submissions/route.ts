import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    const {id}: {id: number} = await req.json();

    

}