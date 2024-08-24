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
            <img className="w-full object-cover" src="https://images.unsplash.com/photo-1717295248358-4b8f2c8989d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8" alt="" />
          </motion.div>
          <motion.div
          animate={{y: -pos+"rem"}}
          transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
          className="w-full -translate-x-[50%] h-full ">
            <img className="w-full object-cover" src="https://images.unsplash.com/photo-1715314117855-3f070860d47f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </motion.div>
          <motion.div
          animate={{y: -pos+"rem"}}
          transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
          className="w-full -translate-x-[50%] h-full">
            <img className="w-full object-cover" src="https://images.unsplash.com/photo-1717200997603-097f16adf0de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </motion.div>
          <motion.div
          animate={{y: -pos+"rem"}}
          transition={{ease: [0.76, 0, 0.24, 1], duration: 0.5}}
          className="w-full -translate-x-[50%] h-full ">
            <img className="w-full object-cover" src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWV8ZW58MHx8MHx8fDA%3D" alt="" />
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
