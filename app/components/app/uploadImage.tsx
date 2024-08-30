"use client"

import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { NextResponse } from "next/server";
export const runtime = "edge";

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

interface UploadProps {
    uploading:Boolean,
    setUploading:Dispatch<SetStateAction<boolean>>, 
    imagePreview: string | null,
    setImagePreview: Dispatch<SetStateAction<string | null>>
}

const UploadImage = ({uploading, setUploading,imagePreview,setImagePreview}:UploadProps) => {
  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;

    async function chooseFile(e: React.ChangeEvent<HTMLInputElement>) {
        setUploading(true);

        try 
        {
            const response = await axios.get(`${window.location.origin}/api/app/getPresignedUrl`, { 
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            console.log(response);
            const preSignedUrl = response.data.preSignedUrl;
            const file = e.target.files?.[0];
            
            if (!file) {
                console.error('No file selected');
                return;
            }
            
            const formData = new FormData();
            formData.set("bucket", response.data.fields["bucket"]);
            formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
            formData.set("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
            formData.set("X-Amz-Date", response.data.fields["X-Amz-Date"]);
            formData.set("key", response.data.fields["key"]);
            formData.set("Policy", response.data.fields["Policy"]);
            formData.set("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
            formData.set("Content-Type", response.data.fields["Content-Type"]);
            formData.append("file", file);
            
            console.log(preSignedUrl,"::::",formData);
            const res = await axios.post(preSignedUrl, formData);

            setImagePreview(`${CLOUDFRONT_URL}${response.data.fields.key}`);
            setUploading(false)

        } catch (e) {
            console.log(e);
            setUploading(false);
        }
    }

    return <div>
        <label htmlFor="imageUpload" className="block text-lg mt-4 mb-2">
            Upload an image for your blink:
          </label>
          <label
            htmlFor="imageUpload"
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md text-center cursor-pointer hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {imagePreview ? "Change Image" : (uploading?"Uploading":"Click to Upload Image")}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={chooseFile}
            className="hidden"
          />

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          )}
    </div>
}

export default UploadImage