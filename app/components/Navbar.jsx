'use client'

import React, { useState, useEffect } from 'react';
import Button from './Button';
import BountySpreadLogo from './Icon';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const runtime = "edge";

function Navbar() {
    const [index, setIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="sticky top-0 w-full bg-zinc-900 bg-opacity-80 z-50 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto">
                <div className={`h-14 flex justify-between items-center transition-all duration-1000 ease-in-out ${!isScrolled ? 'border-b-[1px] border-b-zinc-600' : 'border-b-[1px] border-b-transparent'}`}>
                    <div className="flex gap-12 font-extralight text-sm justify-center">
                        <BountySpreadLogo />
                        {
                            ["Home",  '', "Explore Bounties"].map((elem, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        {elem.length ? (
                                            <div
                                                onClick={() => setIndex(i)}
                                                className='text-white hover:cursor-pointer flex items-center text-'
                                            >
                                                {i === index && (
                                                    <div className="w-1 h-1 mr-1 rounded-full bg-green-400 shadow-emerald-400 shadow-sm"></div>
                                                )}
                                                <h1 className="text-nowrap"> {elem}</h1>
                                            </div>
                                        ) : (
                                            <div className="h-[20px] w-[1px] bg-zinc-500 my-auto"></div>
                                        )}
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                    <div className="w-1/3 flex justify-betw items-center h-[100%]">
                        <WalletMultiButton style={{
                             marginRight:'0.2rem',
                             backgroundColor: 'white',
                             color:'black',
                             fontFamily:'monospace',
                             height: '2em',
                             borderRadius: '9999px',
                             fontWeight:'100',
                             fontSize:''
                        }}/>
                        <Button text="Create a bounty" link={"/signup"} />
                    </div>
                </div>
            </div>
            <div className={`w-full h-[3px] transition-all duration-700 ease-in-out ${isScrolled ? 'bg-emerald-400 opacity-100' : 'bg-transparent opacity-0'}`} />
        </div>
    );
}

export default Navbar;