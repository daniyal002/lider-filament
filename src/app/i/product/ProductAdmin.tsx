'use client'

import React, { useState } from 'react'
import ProductGrid from './ProductGrid'
import ProductModal from './[id]/ProductPage'
import { useProductData } from '@/hook/productHook'
import { IProductResponse } from '@/interface/product'
import { Toaster } from 'react-hot-toast'

export default function ProductAdmin() {
  const {productData} = useProductData()
  const [productId, setProductId] = useState<number>()
  const [productType, setProductType] = useState<"Создать" | "Изменить">("Создать")

  return (
    <div>
      <Toaster toastOptions={{duration:3000}}/>
      <ProductGrid productData={productData as IProductResponse} setProductId={setProductId} setProductType={setProductType}/>
    </div>
  )
}
