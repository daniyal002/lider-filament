'use client'

import React, { useState } from 'react'
import ProductGrid from './ProductGrid'
import ProductModal from './ProductModal'
import { useProductData } from '@/hook/productHook'
import { IProductResponse } from '@/interface/product'

export default function ProductAdmin() {
  const {productData} = useProductData("0","9")
  const [productId, setProductId] = useState<number>()
  const [productType, setProductType] = useState<"Создать" | "Изменить">("Создать")

  return (
    <div>
      <ProductModal productId={productId as number} type={productType} setProductId={setProductId}/>
      <ProductGrid productData={productData as IProductResponse} setProductId={setProductId} setProductType={setProductType}/>
    </div>
  )
}
