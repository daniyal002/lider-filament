import React from 'react'
import ProductPage from './ProductPage'

export default function page({params}:{params:{id:string}}) {
  return (
    <div> <ProductPage productId={Number(params.id)}/> </div>
  )
}
