"use client";
import React from "react";
import { Label } from "@/components/ui/ace-label";
import { Input } from "@/components/ui/ace-input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
// on the onSubmit function just call the function from other file:
// sendEmail(formData);

import { sendEmail } from "@/lib/send-email";
import { Button } from "@/components/ui/button";

// the type we are gonna make for email make them formData interface.
export type formData = {
    email: string;
    message: string;
}


export function FormDemo({header, subheader, secondText}: {header: string, subheader: string, secondText: string}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md mt-8 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-zinc-900 border border-zinc-800">
      <h2 className="font-bold text-xl text-neutral-200">
        {header}
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        {subheader}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="johndoe@gmail.coms" type="email" />
        </LabelInputContainer>  
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">{secondText}</Label>
          <Input id="password" placeholder="The site looks awesome!" type="password" />
        </LabelInputContainer>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex justify-center">
            <Button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              Submit
            </Button>
          </div> 
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
