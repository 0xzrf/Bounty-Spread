import React from 'react'
import Icon from "./Icon"

export const runtime = "edge";

function Footer() {
  return (
    <div className="h-[40vh] mt-10">
      <div className="max-w-screen-xl  flex justify-between items-center h-full mx-auto" >
        <div className="w-[53vw]  ">
          <div className="flex items-center">
            <div className="font-sans">
              <h1 className="text-5xl font-bold tracking-tight">
                <span className="text-white">Bounty</span><span className="text-emerald-400">Spread</span>
              </h1>
            </div>
          </div>
          {/* <div className="flex gap-3 " >
            {
              ["Privacy Policy", "Cookie Policy", "Terms"].map((e) => {
                return (
                  <p className="text-zinc-600 hover:cursor-pointer font-semibold text-[0.7vw]">
                    {e}
                  </p>
                )
              })
            }
          </div> */}
        </div>
        <div className="p-8 w-[47vw] flex">
          {/* <div className="w-[25%]">
            {
              ['Socials', 'Instagram', 'Twitter(X?)', 'LinkedIn'].map((e, i) => {
                return (
                  <p className={` text-[0.8vw] text-zinc-600 ${i == 0 ? "mb-8" : "mb-2"} `} >
                    {e}
                  </p>
                )
              })
            }
          </div>
          <div className="w-[25%]">
            {
              ['Sitemap', 'Home', 'Work', 'Career', "Contact"].map((e, i) => {
                return (
                  <p className={` text-[0.8vw] ${i == 0 ? "text-zinc-600" : "text-white"} ${i == 0 ? "mb-8" : "mb-2"} `} >
                    {e}
                  </p>
                )
              })
            }
          </div> */}
          <div className=" ">
            <h1 className="text-white font-bold text-3xl">Choose the hassle-free route. Choose us!</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer