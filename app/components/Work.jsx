"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlurryBlob from "@/components/animata/background/blurry-blob";
export const runtime = "edge";

function Tagline() {
  const [index, setIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("Bounties");
  const [showCursor, setShowCursor] = useState(true);
  const words = ["Faster", "Smarter", "In minutes"];
  const colors = ["text-yellow-400", "text-blue-400", "text-green-400"];
  const changeWords = ["Bounties", "Projects", "Grants"];
  const [changeWordIndex, setChangeWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentWord = changeWords[changeWordIndex];
    let currentIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      if (!isDeleting && currentIndex <= currentWord.length) {
        setTypedWord(currentWord.slice(0, currentIndex));
        currentIndex++;
      } else if (isDeleting && currentIndex >= 0) {
        setTypedWord(currentWord.slice(0, currentIndex));
        currentIndex--;
      }

      if (currentIndex > currentWord.length) {
        isDeleting = true;
        clearInterval(typeInterval);
        setTimeout(() => {
          const newInterval = setInterval(() => {
            if (currentIndex > 0) {
              setTypedWord(currentWord.slice(0, currentIndex - 1));
              currentIndex--;
            } else {
              clearInterval(newInterval);
              setChangeWordIndex((prev) => (prev + 1) % changeWords.length);
            }
          }, 150);
        }, 2000);
      }
    }, 200);

    return () => clearInterval(typeInterval);
  }, [changeWordIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Blink every 530ms for a natural look

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div>
      <BlurryBlob className="rounded-xl opacity-30" />
      <div className="w-full flex justify-center items-center h-screen bg-zinc-900 py-10">
        <div className="text-center max-w-screen-lg mx-auto mt-[-750px]">
          <motion.h1
            className="text-white text-nowrap font-bold text-[5vw] md:text-[5vw] leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            Create Blinks for {typedWord}
            <span
              className={`inline-block w-[0.3em] h-[5px] bg-white ml-1 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            ></span>{" "}
            <br />
          </motion.h1>
        </div>
      </div>
    </div>
  );
}

export default Tagline;
