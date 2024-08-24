import React from 'react'
import Card from './Card'

function Cards() {
  return (
    <div className='w-full'>
      <div className=" max-w-screen-xl gap-2 flex mx-auto">
        <Card width={'1/3'} isFooter={true} text={{sub1: "Up Next: News", sub2:(<h1 className="text-[2vw] mt-4 leading-8">Insights and behind <br/>the scenes</h1>), footer: (<p className="text-sm text-zinc-400 mb-4">Explore what drives our team</p>)}}/>
        <Card hover='true'  width={'2/3'} text={{sub1: "Get in touch", sub2:(<h1 className="text-[2vw] mt-4 leading-8">Let's get to it. <br/>together</h1>), heading: (<h1 className="text-[6vw] font-normal ">Start a Project</h1>), button: (<button className="rounded-[100px] mb-4 w-[15%] border-zinc-200 border-2 py-2">Contact us</button>)}} isButton={true} isHeading={true}/>
      </div>
    </div>
  )
}

export default Cards
