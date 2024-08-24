'use client'

import { useScroll } from 'framer-motion'
import React, {useState} from 'react'

function Work() {
    const [images, setImages] = useState([
        { url: "https://images.unsplash.com/photo-1716727297033-a9bbdb518ea8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D", top: "50%", left: "50%", isActive: false },
        { url: "https://images.unsplash.com/photo-1716987003895-c93907fbdc07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D", top: "56%", left: "44%", isActive: false },
        { url: "https://images.unsplash.com/photo-1716847215913-1576b0bee22c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D", top: "45%", left: "56%", isActive: false },
        { url: "https://images.unsplash.com/photo-1716467175711-2e9321925230?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D", top: "60%", left: "53%", isActive: false },
        { url: "https://images.unsplash.com/photo-1715353500115-51fce92308d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8", top: "56%", left: "53%", isActive: false },
        { url: "https://images.unsplash.com/photo-1715502998079-3b86f63bdf6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D", top: "55%", left: "55%", isActive: false },
    ])

    const { scrollYProgress } = useScroll();

    scrollYProgress.on('change', data => {
        function imageShow(arr) {
            setImages(prev => (
                prev.map((item, index) => 
                    arr.indexOf(index) === -1 ?
                        { ...item, isActive: false }
                        :
                        { ...item, isActive: true }
                )
            ))
        }

        switch (Math.floor(data * 100)) {
            case 0:
                imageShow([]);
                break;
            case 2:
                imageShow([0]);
                break;

            case 4:
                imageShow([0,1]);
                break;
            case 6:
                imageShow([0,1,2]);
                break;
            case 8:
                imageShow([0,1,2,3]);
                break;
            case 10:
                imageShow([0,1,2,3,4]);
                break;
            case 12:
                imageShow([0,1,2,3,4,5]);
                break;

        }

    })

    return (
        <div className="w-full">
            <div className="h-full  w-full relative max-w-screen-lg mx-auto">
                <div className="text-center relative">
                    <h1 className="text-white font-sans font-medium mt-[-120px] text-[28vw]">work</h1>
                    <div className="absolute w-full h-full top-0">
                        {images.map((elem) => {
                            return (
                                <img className='absolute w-60 h-40 rounded-xl' style={{ top: elem.top, left: elem.left, display: !elem.isActive && "none" }} src={elem.url} alt="" />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Work