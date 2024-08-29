"use client"

import React,{useState} from 'react';
import axios from 'axios';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from '@solana/wallet-adapter-react';
export const runtime = "edge";

const signUpForm = () =>{
    const router = useRouter();
    const {publicKey,signMessage} = useWallet();
    const [form, setForm] = useState({
        email:'',
        username:'',
    });
    const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;
    //fxn to handle individual changes
    const handleChange = (e:any) =>{
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
    }

    //fxn to submit form
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        console.log("hello world")

        const message = new TextEncoder().encode(
          "You're signing-up to BountySpread"
        );
        const signature = await signMessage?.(message);
        //backend route
        const response = await axios.post(`${window.location.origin}/api/signup`,{
          email: form.email,
          username: form.username,
          publicKey,
          signature
        });

        if(!response.data.success){
            alert("axios sign-in request failed!")
        }else{
            router.push("/dashboard/newBounty")
        }    
    }

    return(
      <div className="min-h-screen bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 flex items-center justify-center p-4 relative overflow-hidden">
       

  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 opacity-10 animate-pulse">
      <div className="h-full w-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 blur-3xl"></div>
    </div>
    <div className="absolute inset-0 opacity-5 animate-pulse delay-1000">
      <div className="h-full w-full bg-gradient-to-tl from-zinc-600 via-zinc-700 to-zinc-900 blur-3xl"></div>
    </div>
  </div>

  {/* Form container */}
  <div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-700 relative z-10 backdrop-blur-sm bg-opacity-80">
    <h2 className="text-4xl font-bold mb-8 text-zinc-100 text-center">Sign Up</h2>
    
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-zinc-700 placeholder-zinc-400 text-white rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition duration-200"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
        <input
          type="username"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-zinc-700 placeholder-zinc-400 text-white rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition duration-200"
          placeholder="xyz_999"
          required
        />
      </div>
      
      {/* <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-zinc-700 0 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition duration-200"
          placeholder="••••••••"
          required
        />
      </div> */}

      <div>
      <WalletMultiButton style={{width:"380px", textAlign:"justify", backgroundColor:"#52525b"}} /> 
      </div>
      
      <button
        type="submit"
        className="w-full bg-zinc-600 text-zinc-100 py-3 px-4 rounded-lg font-semibold hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-800 transition duration-200 transform hover:scale-105"
      >
        Create Account
      </button>
    </form>

    <p className="mt-6 text-center text-zinc-400 text-sm">
      Already have an account??{" "}
      <a href="#" className="font-medium text-zinc-300 hover:text-zinc-100 transition duration-200">
        Sign in
      </a>
    </p>
  </div>
</div>
  );
};

export default signUpForm;