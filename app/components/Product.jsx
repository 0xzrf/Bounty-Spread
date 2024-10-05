import React from 'react'
import Button from './Button'
import SwapTextCard from '@/components/animata/card/swap-text-card'

export const runtime = "edge";

function Product({ product }) {
  return (
    <div className="min-w-screen-xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <SwapTextCard
          initialText={product.card1.description}
          finalText={product.card1.details}
          title={product.card1.title}
        />
        <SwapTextCard
          initialText={product.card2.description}
          finalText={product.card2.details}
          title={product.card2.title}
        />
      </div>
      <div className="mt-6 flex flex-col sm:w-fit sm:mx-auto sm:text-center sm:flex-row justify-center gap-4 sm:gap-6">
        {product.card1.buttonLink && (
          <Button link={product.card1.buttonLink} disabled={true} text={product.card1.buttonText} className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-800 text-white mb-2 sm:mb-0 text-xs sm:text-lg md:text-base lg:text-lg xl:text-xl" />
        )}
        {product.card2.buttonLink && (
          <Button link={product.card2.buttonLink} text={product.card2.buttonText} className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-800 text-white text-base sm:text-lg md:text-xl" />
        )}
      </div>
    </div>
  )
}

export default Product
