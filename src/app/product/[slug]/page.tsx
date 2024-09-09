import React from 'react'
import ProductDetail from './ProductDetail'

export default function page({params}:{params:{slug:string}}) {
  return (
    <div><ProductDetail productId={params.slug}/></div>
  )
}
