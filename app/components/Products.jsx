import React, { useState } from 'react'
import Product from './Product'
import { motion } from 'framer-motion'
function Products() {
  const vars = [
    {
      title: "Arqitel",
      description: "This is my biggest confession that I don't know wth is wrong with me",
      caseStudy: false,
      live: true
    },
    {
      title: "TTR",
      description: "This is my biggest confession that I don't know wth is wrong with me",
      caseStudy: false,
      live: true
    },
    {
      title: "YIR 2024",
      description: "This is my biggest confession that I don't know wth is wrong with me",
      caseStudy: false,
      live: true
    },
    {
      title: "Yahoo!",
      description: "This is my biggest confession that I don't know wth is wrong with me",
      caseStudy: true,
      live: true
    },
  ]

  const [pos, setPos] = useState(null);
  const movePos = (val) => {
    setPos(18*val)
  }

  return (
    
    <div className="mt-20 bg-red relative">
      {
        vars.map((elem, i) => {
          return (
            <Product
              val={elem}
              count={i}
              mover={movePos}
              setPos={setPos}
            /> 
          )
        })
      }
      <div className="absolute top-0 w-full h-full pointer-events-none ">
   { (pos !== null) ?
        <motion.div 
        initial={{y: pos, x: "-50%"}}
        animate={{y: pos+"rem"}}
        transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
        className="w-[35vw] h-[18rem] absolute  left-[44%] overflow-hidden">
          <motion.div
          animate={{y: -pos+"rem"}}
          transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
          className="w-full -translate-x-[50%] h-full ">
            <img className="w-full object-cover" src="https://www.hackthebox.com/images/landingv3/mega-menu-login-academy.png" alt="" />
          </motion.div>
          <motion.div
          animate={{y: -pos+"rem"}}
          transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
          className="w-full -translate-x-[50%] h-full ">
            <img className="w-full object-cover" src="https://assets.tryhackme.com/img/paths/redteaming.svg" alt="" />
          </motion.div>
          <motion.div
          animate={{y: -pos+"rem"}}
          transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
          className="w-full -translate-x-[50%] h-full">
            <img className="w-full object-cover" src="https://assets.tryhackme.com/img/paths/offensivepentesting.jpg" alt="" />
          </motion.div>
          <motion.div
          animate={{y: -pos+"rem"}}
          transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
          className="w-full -translate-x-[50%] h-full ">
            <img className="w-full object-cover" src="https://assets.tryhackme.com/img/paths/SOCL1.svg" alt="" />
          </motion.div>
        </motion.div>
        :
        null
}
      </div>
    </div>
  )
}

export default Products
