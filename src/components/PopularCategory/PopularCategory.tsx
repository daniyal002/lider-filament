'use client'
import React from 'react'
import style from './PopularCategory.module.scss'
import { useCategoryData } from '@/hook/categoryHook'
import { useProductFilter } from '../ProductFilterContext/ProductFilterContext'
import { useRouter } from 'next/navigation'

export default function PopularCategory() {
  const {categoryData,isLoading} = useCategoryData()
  const {setCategoryId} = useProductFilter()
  const {push} = useRouter()

  const handleCategoryClick = (categoryId:number) => {
    setCategoryId(categoryId); // Устанавливаем categoryId в контексте
    push('/product')
  };
  return (
    <>
    <h2 className={style.header}>Популярные категории</h2>
    <div className={style.container}>
        {isLoading ? (
            <div className={style.spinner}>
            <img src="/icon/loop_black_48dp.svg" alt="" />
            </div>
        ) : (
            // <div className={style.popularProducts}>
            <>    
            {categoryData?.detail.filter(category => category.product_count as number >= 2  ).map(category => (
                    <div className={style.categoryWrapper} key={category.category_id} onClick={() => handleCategoryClick(category.category_id)}>
                      <p>{category.category_name}</p>
                    </div>
                ))}
                </>
            // </div>
        )}
    </div>
    </>
  )
}
