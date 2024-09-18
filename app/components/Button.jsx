import React from "react";
import { useRouter } from "next/navigation";

export const runtime = "edge";

function Button({ text, link, disabled=false }) {
  const router = useRouter();
  return (
    <button
      disabled={disabled}
      className="bg-white flex justify-between items-center rounded-full px-3 sm:px-4 w-full sm:w-40 h-8 sm:h-[2em] text-nowrap"
      onClick={() => {
        router.push(`${link}`);
      }}
    >
      <h1 className="font-mono text-xs w-full text-center sm:text-sm font-light mr-1 sm:mr-2">{text}</h1>
    </button>
  );
}

export default Button;
