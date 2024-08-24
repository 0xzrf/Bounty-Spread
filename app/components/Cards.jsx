import React from 'react'
import Card from './Card'
import { motion } from 'framer-motion';

export const runtime = "edge";

function Cards() {
  return (
    <div className='w-full'>
      <div className=" max-w-screen-xl gap-2 justify-center flex mx-auto">
        <Card width={'1/3'} isFooter={true} text={{sub1: "FREE TIER", sub2:(<h1 className="text-[2vw] mt-4 leading-8">Bounty Host<br/></h1>),features: (
          <ul className='flex flex-col '>
            <li>
            <i class="ri-corner-up-right-line"></i> Create upto 5 blinks
            </li>
            <li> 
            <i class="ri-corner-up-right-line"></i> Blink verification will take upto 2 hours
            </li>
          </ul>
          
          ) , footer: (<p className="text-sm text-zinc-400 mb-4"></p>)}}/>
        <Card hover='true'  width={'1/3'} text={{sub1: "PAID PLAN", sub2:(<h1></h1>),features: (
          <ul className=''>
            <li>
            <i class="ri-corner-up-right-line"></i> Create upto 5 blinks
            </li>
            <li className="flex gap-1"> 
            <i class="ri-corner-up-right-line"></i> <motion.h1 
                    className="text-white font-bold  leading-tight mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                >
                    Blink verification will take up to <br />
                    <motion.span
                        className={`inline-block text-blue-400`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        in 5 minutes
                    </motion.span>
                </motion.h1>
            </li>
            
          </ul>
          
          ),sub2:(<h1 className="text-[2vw] mt-4 leading-8">Bounty Host<br/></h1>), heading: (<h1 className="text-[6vw] font-normal ">Start a Project</h1>), button: (<button className="rounded-[100px] mb-4 w-[15%] border-zinc-200 border-2 py-2">Contact us</button>)}}/>
      </div>
    </div>
  )
}

export default Cards
