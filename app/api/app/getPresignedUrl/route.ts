import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {verifyUser} from "@/app/api/helperFuncs/functions";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
export const runtime = 'edge';

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID as string;
const ACCESS_KEY_PASSWORD = process.env.ACCESS_KEY_PASSWORD as string;
console.log(ACCESS_KEY_ID,":::",ACCESS_KEY_PASSWORD);

const s3Client = new S3Client(
    {
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: ACCESS_KEY_PASSWORD,
        },
        region: "eu-north-1"
    });

export const GET = async (req:NextRequest) => {
    const token = cookies().get("token");
    const {valid, userId} = await verifyUser(token?.value as string)

    console.log(token?.value, valid)
    if (!valid) {
        return NextResponse.json({
            msg: "Invalid user"
        }, {
            status: 401
        })
    }

    const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: 'decentralised-dao-labour',
        Key: `/uploads/${userId}/${Math.random()}/image.jpg`,
        Conditions: [
            ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
        ],
        Fields: {
            'Content-Type': 'image/jpg'
        }, 
        Expires: 3600
    })

    return NextResponse.json({
        preSignedUrl : url,
        fields
    })


}