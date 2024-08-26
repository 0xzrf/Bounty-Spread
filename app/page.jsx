'use client'

import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Products from "./components/Products";
import Stripes from "./components/Stripes"
import Marquees from "./components/Marquees";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export const runtime = "edge";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    let scroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default();
    });

    setIsReady(true)

    return () => {
      if (scroll) scroll.destroy();
    };
  });

  if (!isReady) {
    return null
  }

  return (
    <div style={{ paddingTop: "0.1px", paddingBottom: "0.1px"}} className="bg-zinc-900" >
      <Navbar/>
      <Work/>
      <Stripes/>
      <Products/>
      {/* <Marquees/> */}
      <Cards/>
      <Footer/>
    </div>
  );
}
