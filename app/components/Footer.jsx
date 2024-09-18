import React from 'react'
import Icon from "./Icon"

export const runtime = "edge";

function Footer() {
  return (
    <div className="h-auto mt-10">
      <div className="max-w-screen-xl flex flex-col md:flex-row justify-between items-center h-full mx-auto">
        <div className="w-full md:w-[53vw] mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <div className="font-sans text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                <span className="text-white">Bounty</span><span className="text-emerald-400">Spread</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 w-full md:w-[47vw] flex justify-center md:justify-end">
          <div className="text-center md:text-right">
            <h1 className="text-white font-bold text-xl md:text-3xl">Choose the hassle-free route. Choose us!</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer