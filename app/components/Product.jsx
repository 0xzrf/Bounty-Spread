import React from 'react'
import Button from './Button'

function Product({val, mover, count, setPos}) {
  return (
    <div onMouseEnter={() => {mover(count)}} onMouseLeave={() => {
      if (count === 0 || count === 3){
        setPos(null)
      }
    }} className="w-full h-[18rem] ease-out">
      <div  className="max-w-screen-xl p-10 mx-auto text-white flex justify-between">
        <h1 className="text-[3vw]">{val.title}</h1>
        <div className="w-1/3">
            <h1 className="mb-4 text-[0.9vw] leading-none">{val.description}</h1>
            <div className="flex  text-black gap-6">
            {val.live  && <Button text={"Live share"}/>}
            {val.caseStudy && <Button text={"Case Studies"}/>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Product
