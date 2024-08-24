import React, { useState } from 'react'
import Product from './Product'
import { motion } from 'framer-motion'

export const runtime = "edge";

function Products() {
  const vars = [
    {
      title: <div>Bounty-to-Blink <span className='block'>Conversion</span></div>,
      description: <div className="w-full bg-zinc-900 font-sans">
      <div className="text-center text-white">
          <h3 className="text-sm text-left md:text-xl font-semibold mb-4">Why Create Blinks Out of Bounties?</h3>
          <ul className="text-xl text-left  font-light leading-relaxed space-y-4">
              <li>📡 Share it on a distributed network like X.</li>
              <li>🚀 Better than ads & can reach larger audiences.</li>
              <li>🔗 In-app participation without leaving X</li>
          </ul>
      </div>
  </div>,
      buttonText: '',
      buttonLink: ''
    },
    {
      title: <div>Create <span className='block'>Blinks-- Faster!!</span></div>,
      description: <div className='text-xl'>Registering and verifying a blink takes upto 48 hours, we can help you create a blink in up to 2 hours(And 5 if you're pro user ;))</div>,
      buttonText: 'Make it now ->',
      buttonLink: '/makeBlink'
    },
    {
      title: <div>Bounty Dispense <span className='block'>made easy</span></div>,
      description: <div className='text-xl'>Distributing bounties made easier through blinks, letting winners claim their bounty within X itself, by interacticting with the blink</div>,
      buttonText: '',
      buttonLink: ''
    },
    {
      title: <div>Dedicated <span className='block'>dashboard</span></div>,
      description: <div className='text-xl'>A place to track submissions and all participants.</div>,
      buttonText: 'sign-in now',
      buttonLink: '/signin'
    },
  ]

  const [pos, setPos] = useState(null);
  const movePos = (val) => {
    setPos(18*val)
  }

  return (
    
    <div className="mt-20 relative">
    <p class="text-[3vw] text-white mx-auto text-center ">
        FEATURES
    </p>

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
   {/* { (pos !== null) ?
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
} */}
      </div>
    </div>
  )
}

export default Products
