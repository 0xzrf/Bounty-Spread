'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Tagline() {
    const [index, setIndex] = useState(0);
    const words = ["Faster", "Smarter", "In minutes"];
    const colors = ["text-yellow-400", "text-blue-400", "text-green-400"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex justify-center items-center h-[60vh] bg-zinc-900 py-10">
            <div className="text-center max-w-screen-lg mx-auto">
                <motion.h1 
                    className="text-white font-bold text-[6vw] md:text-[5vw] leading-tight mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                >
                    Create Blinks from Bounties <br />
                    <motion.span
                        key={index}
                        className={`inline-block ${colors[index]}`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        {words[index]}
                    </motion.span>
                </motion.h1>
            </div>
        </div>
    );
}

export default Tagline;
