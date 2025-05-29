"use client";

import { baseURL } from "@/api/interseptors";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { useProductFilter } from "@/components/ProductFilterContext/ProductFilterContext";
import { useCreateCartMutation } from "@/hook/cartHook";
import { useCategoryData } from "@/hook/categoryHook";
import useLocalCart from "@/hook/localStorageCartHook";
import { useProductData, useProductFeaturedData } from "@/hook/productHook";
import {
  IProductResponse,
  IProductResponseDetail,
  product_additional_prices,
} from "@/interface/product";
import { getAccessToken } from "@/services/auth-token.service";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./Product.module.scss";
import { Toaster } from "react-hot-toast";

export default function Product() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [nameProduct, setNameProduct] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const { categoryId, setCategoryId } = useProductFilter();

  // Fetching products and categories
  const { productData } = useProductData();
  const { categoryData } = useCategoryData();
  const { productFeaturedData } = useProductFeaturedData();
  const { mutate: createCartMutation } = useCreateCartMutation();
  const { addLocalCart } = useLocalCart();
  const accessToken = getAccessToken();

  const addCart = (
    product_id: number,
    product_price: number,
    product_quantity: number = 1,
    product_image: string,
    product_additional_prices: product_additional_prices[]
  ) => {
    accessToken
      ? createCartMutation({
          product_id,
          product_price,
          product_quantity,
          product_image,
        })
      : addLocalCart({
          product_id,
          product_price,
          product_quantity,
          product_additional_prices,
        });
  };

  // Filtering logic - runs when productData or filter conditions change
  useEffect(() => {
    if (productData) {
      let filtered = productData.detail;

      if (nameProduct) {
        filtered = filtered.filter((product) =>
          product.product_name.toLowerCase().includes(nameProduct.toLowerCase())
        );
      }

      if (minPrice !== undefined) {
        filtered = filtered.filter(
          (product) => product.product_price >= minPrice
        );
      }

      if (maxPrice !== undefined) {
        filtered = filtered.filter(
          (product) => product.product_price <= maxPrice
        );
      }

      if (categoryId) {
        filtered = filtered.filter(
          (product) => product.product_category.category_id === categoryId
        );
      }

      setFilteredProducts(filtered); // Update the filtered products

      // Reset pagination to the first page after filtering
      setSkip(0);
    }
  }, [productData, nameProduct, minPrice, maxPrice, categoryId]);

  const [filteredProducts, setFilteredProducts] = useState<
    IProductResponseDetail[]
  >(productData?.detail as IProductResponseDetail[]); // State to hold filtered products
  // Function to handle pagination
  const handlePagination = (newSkip: number) => {
    setSkip(newSkip);
  };

  const reset = () => {
    setNameProduct(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setCategoryId(null);
  };

  return (
    <div className="container">
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="row">
        <aside
          id="sidebar"
          className="col-xs-12 col-sm-4 col-md-3 wow fadeInLeft"
          data-wow-delay="0.4s"
        >
          <section className="shop-widget">
            <h2
              style={{
                background:
                  "linear-gradient(297deg, #9CD0FF, #A95BF3, #9CD0FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Категории
            </h2>
            <ul className="list-unstyled category-list">
              {categoryData?.detail.map((category) => (
                <li key={category.category_id}>
                  <a
                    style={{
                      cursor: "pointer",
                      color:
                        categoryId === category.category_id
                          ? "#551A8B"
                          : "white", // Измените цвет по вашему желанию
                      fontWeight:
                        categoryId === category.category_id ? "bold" : "normal",
                    }}
                    onClick={() => {
                      if (category.category_id === categoryId) {
                        setCategoryId(null);
                      } else {
                        setCategoryId(category.category_id);
                      }
                    }}
                  >
                    <span className="name">{category.category_name}</span>
                    <span className="num">{category.product_count}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <div
          className="col-xs-12 col-sm-8 col-md-9 wow fadeInRight"
          style={{ padding: "0 5px" }}
          data-wow-delay="0.4s"
        >
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            <>
              <ul
                className=""
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  columnGap: "10px",
                  rowGap: "30px",
                  listStyle: "none",
                  justifyContent: "center",
                  padding: "0 10px",
                  margin: "0 auto",
                }}
              >
                {filteredProducts.slice(skip, skip + limit).map((product) => (
                  <li key={product.product_id} style={{ textAlign: "center" }}>
                    <div className="mt-product1 large">
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
                                width={290}
                                height={400}
                              />
                            </Link>
                            <ul className="links">
                              <li>
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    addCart(
                                      product.product_id as number,
                                      product.product_price,
                                      1,
                                      // @ts-ignore
                                      product.product_images[0]?.image_patch,
                                      product.product_additional_prices as product_additional_prices[]
                                    )
                                  }
                                >
                                  <i
                                    className="bi bi-basket"
                                    style={{
                                      fontSize: "15px",
                                      color: "#fff",
                                      fontWeight: "700",
                                    }}
                                  ></i>
                                  <span>В корзину</span>
                                </a>
                              </li>
                              {/* <li>
                                <FavoriteButton
                                  productId={product.product_id as number}
                                  productFeaturedData={
                                    productFeaturedData as IProductResponse
                                  }
                                />
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        className="txt"
                        style={{ textAlign: "left", padding: "0" }}
                      >
                        <strong className="title">
                          {product.product_category.category_name}
                        </strong>
                        <strong
                          className="title"
                          style={{ maxWidth: "215px", lineHeight: "25px" }}
                        >
                          <Link href={`product/${product.product_id}`}>
                            {product.product_name}
                          </Link>
                        </strong>
                        <span className="price">
                          <span>
                            {product?.product_additional_prices &&
                            product.product_additional_prices.length > 0
                              ? "от " +
                                Math.min(
                                  ...product.product_additional_prices.map(
                                    (price) => price.product_additional_price
                                  )
                                )
                              : product.product_price}
                          </span>
                          ₽/кг
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <nav className="mt-pagination">
                <ul className="list-inline">
                  <li>
                    {skip > 0 && (
                      <button
                        onClick={() => handlePagination(skip - limit)}
                        disabled={skip <= 0}
                        className={style.reset}
                      >
                        Назад
                      </button>
                    )}
                  </li>
                  <li>
                    {skip + limit < filteredProducts.length && ( // Only show if more products exist
                      <button
                        onClick={() => handlePagination(skip + limit)}
                        className={style.reset}
                      >
                        Вперед
                      </button>
                    )}
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <p>Нет продуктов</p>
          )}
        </div>
      </div>
    </div>
  );
}
