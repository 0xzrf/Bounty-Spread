import React from 'react'
import {motion} from "framer-motion"
function Card({ width, text, isHeading=false, isButton = false, isFooter=false, hover= "" }) {
  return (
    <motion.div whileHover={{backgroundColor: hover === "true" && "#7443ff" }} className={`w-${width} p-4 py-6 mb-10 bg-[#323339]  text-white rounded-md  h-[60vh]`}>
      <div className='flex h-full flex-col justify-between '>
        <motion.div whileHover={{paddingLeft: "0.5vw", paddingRight: "0.5vw"}} transition={{delay: 0.2}} className="h-1/3">
          <div className="flex justify-between">
            <h1 className="text-sm font-light">{text.sub1}</h1>
            <i class="ri-arrow-right-line"></i>
          </div>
          <div>
            {text.sub2}
          </div>
        </motion.div>
        <div className='h-2/3 '>
          <div className="h-full flex flex-col justify-end" >
            {isHeading && text.heading}
            {isButton && text.button}
            {isFooter && text.footer}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
