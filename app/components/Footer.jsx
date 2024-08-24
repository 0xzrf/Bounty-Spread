import React from 'react'

function Footer() {
  return (
    <div className="h-[40vh] mt-10">
      <div className="max-w-screen-xl  flex justify-between items-center h-full mx-auto" >
        <div className="w-[53vw]  ">
          <h1 className="text-white text-[9vw] flex justify-items-center font-semibold ">
            refokus.
          </h1>
          <div className="flex gap-3 " >
            {
              ["Privacy Policy", "Cookie Policy", "Impressum", "Terms"].map((e) => {
                return (
                  <p className="text-zinc-600 hover:cursor-pointer font-semibold text-[0.7vw]">
                    {e}
                  </p>
                )
              })
            }
          </div>
        </div>
        <div className="p-8 w-[47vw] flex">
          <div className="w-[25%]">
            {
              ['Socials', 'Instagram', 'Twitter(X?)', 'LinkedIn'].map((e, i) => {
                return (
                  <p className={` text-[0.8vw] text-zinc-600 ${i == 0 ? "mb-8" :"mb-2"} `} >
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
                  <p className={` text-[0.8vw] ${i == 0 ? "text-zinc-600" : "text-white"} ${i == 0 ? "mb-8" :"mb-2"} `} >
                    {e}
                  </p>
                )
              })
            }
          </div>
          <div className="w-[40%] flex flex-col items-end justify-end gap-6 ">
              <h1 className="text-white font-bold text-[0.7vw]" >Refokus is pioneering digital agency driven by design and empowered by technology</h1>
              <img className="w-40  h-4 flex justify-end" src="https://assets-global.website-files.com/6334198f239547d0f9cd84b3/6637ba0d8481b4339b1cda4f_Frame%2048097733.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer