'use client'

import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Products from "./components/Products";
import Stripes from "./components/Stripes"
import Marquees from "./components/Marquees";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    let scroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default();
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  });

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
