'use client'
import { baseURL } from '@/api/interseptors'
import { useCreateCartMutation } from '@/hook/cartHook'
import { useAddProductFeaturedMutation, useDeleteProductFeaturedMutation, useProductData, useProductFeaturedData } from '@/hook/productHook'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './PopularProducts.module.scss'

export default function PopularProducts() {
    const {productData,isLoading} = useProductData("0","5")
    const {productFeaturedData} = useProductFeaturedData()
    const {mutate:createCartMutation} = useCreateCartMutation()
    const {mutate:addProductFeaturedMutation} = useAddProductFeaturedMutation()
    const {mutate:deleteProductFeaturedMutation} = useDeleteProductFeaturedMutation()
  return (
    <>
    <h2 className={style.header}>Популярные товары</h2>
    <div className={style.container}>
        {isLoading ? (
            <div className={style.spinner}>
            <img src="./icon/loop_black_48dp.svg" alt="" />
            </div>
        ) : (
            <div className={style.popularProducts}>
                {productData?.detail.map(product => (
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
                                <span>Add to Cart</span>
                              </a>
                            </li>
                            <li>
                              {productFeaturedData?.detail.find(
                                (productFeature) =>
                                  productFeature.product_id === product.product_id
                              ) ? (
                                <button
                                  style={{
                                    border: "0",
                                    backgroundColor: "transparent",
                                    color:"red"
                                  }}
                                  onClick={() =>
                                    deleteProductFeaturedMutation(
                                      product.product_id as number
                                    )
                                  }
                                >
                                  <i className="bi bi-heart-fill"></i>
                                </button>
                              ) : (
                                  <button
                                  style={{
                                    border: "0",
                                    backgroundColor: "transparent",
                                  }}
                                  onClick={() =>
                                    addProductFeaturedMutation(
                                      product.product_id as number
                                    )
                                  }
                                >
                                  <i className="bi bi-heart-fill"></i>
                                </button>
                              )}
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
