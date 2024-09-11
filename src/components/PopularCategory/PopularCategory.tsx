'use client'
import React from 'react'
import style from './PopularCategory.module.scss'
import { useCategoryData } from '@/hook/categoryHook'

export default function PopularCategory() {
  const {categoryData,isLoading} = useCategoryData()
  return (
    <>
    <h2 className={style.header}>Популярные категории</h2>
    <div className={style.container}>
        {isLoading ? (
            <div className={style.spinner}>
            <img src="./icon/loop_black_48dp.svg" alt="" />
            </div>
        ) : (
            <div className={style.popularProducts}>
                {categoryData?.detail.filter(category => category.product_count as number > 2 ).map(category => (
                    <div className={style.categoryWrapper}>
                      <p>{category.category_name}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
    </>
  )
}
