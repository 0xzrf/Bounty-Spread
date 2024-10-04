"use client"

import { useWallet } from "@solana/wallet-adapter-react";
import CreateSignature from "./CreateSignature";

const MercuryoWidget = (publicKey: string) => {
    
    const secret = 'secret';
    const baseUrl = 'https://exchange.mercuryo.io/';

    const signatureInput = `${publicKey}${secret}`;
    const signature = CreateSignature(signatureInput);

    const params = {
      widget_id: 'a8c1dead-ed5f-4740-b9ce-c4ea7721c93b',
      type: 'buy',
      address: publicKey,
      signature: signature,
      currency: "SOL"
    };

    console.log(params);

    const finalUrl = `${baseUrl}?${JSON.stringify(params)}&theme=haru_dark`;
    return finalUrl;
  };

  export default MercuryoWidget;
  