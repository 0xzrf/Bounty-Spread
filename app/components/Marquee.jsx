import React from 'react'
import { motion } from 'framer-motion'

function Marquee({items, direction}) {
  return (
      <div className="flex justify-around py-4 whitespace-nowrap overflow-hidden">
        <motion.div 
            initial={{x: direction === 'left' ? "0" : "-100%"}}
            animate={{x: direction === 'left' ? "-100%" : "0"}}
            transition={{ease: 'linear', duration: 15, repeat: Infinity}}
            className="flex flex-shrink-0 gap-20  pr-10">
          {items.map((e, i) => <img key={i} src={e} alt="" className='w-28 flex-shrink-0' /> )}
        </motion.div>
        <motion.div 
            initial={{x: direction === 'left' ? "0" : "-100%"}}
            animate={{x: direction === 'left' ? "-100%" : "0"}}
            transition={{ease: 'linear', duration: 15, repeat: Infinity}}
            className="flex flex-shrink-0 gap-20 py-4 pr-19  ">
          {items.map((e, i) => <img key={i} src={e} alt="" className='w-28 flex-shrink-0' /> )}
        </motion.div> 
    </div>
  )
}

export default Marquee
