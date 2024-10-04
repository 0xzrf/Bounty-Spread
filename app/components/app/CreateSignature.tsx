import React from 'react'

async function CreateSignature(sig:string) {
    const signature = await getSHA512Hash(sig);
    return signature;
}

const getSHA512Hash = async (sig:string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(sig);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export default CreateSignature
