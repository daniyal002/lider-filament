'use client'

import React, { useState } from 'react'
import CategoryGrid from './CategoryGrid'
import CategoryModal from './CategoryModal'
import { useCategoryData } from '@/hook/categoryHook'
import { ICategoryResponse } from '@/interface/category'

export default function CategoryAdmin() {
  const {categoryData} = useCategoryData()
  const [categoryId, setCategoryId] = useState<number>()
  const [categoryType, setCategoryType] = useState<"Создать" | "Изменить">("Создать")

  return (
    <div>
      <CategoryModal categoryId={categoryId as number} type={categoryType} setCategoryId={setCategoryId}/>
      <CategoryGrid categoryData={categoryData as ICategoryResponse} setCategoryId={setCategoryId} setCategoryType={setCategoryType}/>
    </div>
  )
}
