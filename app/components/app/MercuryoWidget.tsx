"use client"

import { useEffect,useRef } from "react";

declare global {
    interface Window {
        mercuryoWidget: any
    }
}

const MercuryoWidget = () => {
    const widget = useRef(null);
    const signature = sha21
    useEffect(() => {
      if (window.mercuryoWidget) {
        window.mercuryoWidget.run({
          widgetId: 'a8c1dead-ed5f-4740-b9ce-c4ea7721c93b',
          host: widget.current,
          signature: 
        });
      }
    }, []);
  
    return <div ref={widget}></div>;
  };
  
  export default MercuryoWidget;
  