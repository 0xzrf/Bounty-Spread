import React from 'react';
import MercuryoWidget from '../components/app/MercuryoWidget';
import Script from 'next/script';

function widget() {
  return (
    <div>
        This is a mercuryo demo.
        <MercuryoWidget />
        <Script
        src="https://widget.mercuryo.io/embed.2.0.js"
        strategy="afterInteractive"
      />
    </div>
  )
}

export default widget
