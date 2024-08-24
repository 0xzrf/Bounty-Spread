import React from 'react'

function Stripe({url,length, num}) {
  return (
    <div className=" w-[16.44%] p-4 border-[0.2px] border-zinc-700 flex justify-between text-white ">
      <img className="w-2/3" src={url} alt="" />
      <h1 className="font-light">{num}</h1>
    </div>
  )
}

export default Stripe