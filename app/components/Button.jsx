import React from 'react'
import { useRouter } from 'next/navigation'

function Button({text,link}) {
  const router = useRouter();
  return (
    <button className="bg-white flex justify-between items-center rounded-full px-4 w-30 h-[2em]" onClick={()=>{
      router.push(`${link}`)
      }}>
        <h1 className='font-mono text-[0.9vw] font-light mr-2'>{text}</h1>
    </button>
  )
}

export default Button
