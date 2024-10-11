'use client'
import { baseURL } from '@/api/interseptors'
import { useCreateCartMutation } from '@/hook/cartHook'
import { useProductFeaturedData, useProductTopData } from '@/hook/productHook'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './PopularProducts.module.scss'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import { IProductResponse } from '@/interface/product'

export default function PopularProducts() {
    const {productTopData,isLoading} = useProductTopData()
    const {mutate:createCartMutation} = useCreateCartMutation()
    const {productFeaturedData} = useProductFeaturedData()
  return (
    <>
    <h2 className={style.header}>Популярные товары</h2>
    <div className={style.container}>
        {isLoading ? (
            <div className={style.spinner}>
            <img src="/icon/loop_black_48dp.svg" alt="" />
            </div>
        ) : (
            <div className={style.popularProducts}>
                {productTopData?.detail.map(product => (
                    <div className="mt-product1 large" key={product.product_id}>
                    <div className="box">
                      <div className="b1">
                        <div className="b2">
                          <Link href={`/product/${product.product_id}`}>
                            <Image
                              loader={() =>
                                `${baseURL}/${
                                  product?.product_images &&
                                  product?.product_images[0]?.image_patch
                                }`
                              }
                              src={`${baseURL}/${
                                product?.product_images &&
                                product?.product_images[0]?.image_patch
                              }`}
                              alt={String(product.product_id)}
                              width={275}
                              height={290}
                            />
                          </Link>

                          <ul className="links">
                            <li>
                              <a onClick={() => createCartMutation({product_id:product.product_id as number,product_price:product.product_price,product_quantity:1})}>
                                <i className="icon-handbag"></i>
                                <span>В корзину</span>
                              </a>
                            </li>
                            <li>
                              <FavoriteButton productId={product.product_id as number} productFeaturedData={productFeaturedData as IProductResponse}/>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="txt">
                      <strong className="title">
                        <a href="product-detail.html">{product.product_name}</a>
                      </strong>
                      <span className="price">
                        <i className="fa fa-eur"></i>{" "}
                        <span>{product.product_price}</span>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
        )}
    </div>
    </>
  )
}
