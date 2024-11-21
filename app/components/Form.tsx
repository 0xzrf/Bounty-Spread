"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/ace-label";
import { Input } from "@/components/ui/ace-input";
import { cn } from "@/lib/utils";
import axios from "axios";
import {toast, Toaster} from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function FormDemo({header, subheader, secondText, className}: {header: string, subheader: string, secondText: string, className?: string}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submit starts
    const data = {email, message, type: secondText == "Feedback"?"Feedback":"Integration request"}
      try {
        const response = await axios.post(`https://email-bs.onrender.com?email=${email}&message=${message}&type=${secondText == "Feedback"?"Feedback":"Integration request"}`);

        toast.success("Form submitted successfully!");
        setLoading(false); // Set loading to false after success
        console.log(data);
        console.log(email, message);
      }catch(e) {
        toast.success("Form submitted successfully!");
        setLoading(false); // Set loading to false after success
      }
  };

  return (
    <div className={`max-w-md mt-8 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-zinc-900 border border-zinc-800 ${className && className}`}>
      <h2 className="font-bold text-xl text-neutral-200">
        {header}
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        {subheader}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="johndoe@gmail.coms" type="email"  />
        </LabelInputContainer>  
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">{secondText}</Label>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} id="password" placeholder="The site looks awesome!" />
        </LabelInputContainer>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex justify-center">
          {loading ? (
            <Button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                Loading...
              </motion.div>
            </Button>
          ) : (
            <Button disabled={!email || !message} onClick={e => {e.preventDefault(); handleSubmit()}} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              Submit
            </Button>
          )}
        </div> 
      </form>
      <Toaster />
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
