import React from 'react'

function Button({text}) {
  return (
    <button className="bg-white flex justify-between items-center rounded-full px-4 ">
        <h1 className='font-sans text-[0.9vw] font-light mr-2'>{text}</h1>
        <i class="ri-arrow-right-line"></i>
    </button>
  )
}

export default Button
