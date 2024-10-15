"use client";

import { baseURL } from "@/api/interseptors";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { useCreateCartMutation } from "@/hook/cartHook";
import { useCategoryData } from "@/hook/categoryHook";
import useLocalCart from "@/hook/localStorageCartHook";
import {
  useAddProductFeaturedMutation,
  useDeleteProductFeaturedMutation,
  useProductData,
  useProductFeaturedData,
} from "@/hook/productHook";
import { IProductResponse, IProductResponseDetail } from "@/interface/product";
import { getAccessToken } from "@/services/auth-token.service";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Product() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [nameProduct, setNameProduct] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [categoryId, setCategoryId] = useState<number>();

  // Fetching products and categories
  const { productData } = useProductData();
  const { categoryData } = useCategoryData();
  const { productFeaturedData } = useProductFeaturedData();
  const { mutate: createCartMutation } = useCreateCartMutation();
  const {addLocalCart} = useLocalCart()
  const accessToken = getAccessToken()

  const addCart = (product_id:number,product_price:number,product_quantity:number = 1,product_image:string) => {
    accessToken ? createCartMutation({product_id,product_price,product_quantity,product_image}) : addLocalCart({product_id,product_price,product_quantity})
  }

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
    setNameProduct(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
  }

  return (
    <div className="container">
      <div className="row">
        <aside
          id="sidebar"
          className="col-xs-12 col-sm-4 col-md-3 wow fadeInLeft"
          data-wow-delay="0.4s"
        >
          <section
            className="shop-widget filter-widget bg-grey"
            style={{
              background: "rgba(134, 155, 223, 0.14)",
              border: "1px solid #efefef",
              padding: "36px 38px 48px 30px",
            }}
          >
            <h2
              style={{
                background:
                  "linear-gradient(297deg, #9CD0FF, #A95BF3, #9CD0FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Фильтр
            </h2>

            <div
              className="search-range"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                className="sub-title"
                style={{ margin: "0", color: "#fff" }}
              >
                Название товара
              </span>
              <input
                type="text"
                value={nameProduct || ""}
                onChange={(e) => setNameProduct(e.target.value)}
                className="form-control"
                placeholder="Название товара"
              />
              <span
                className="sub-title"
                style={{ margin: "0", color: "#fff" }}
              >
                Цена
              </span>
              <input
                type="text"
                value={minPrice || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {  // Allow only numbers (digits)
                    setMinPrice(Number(value));
                  }
                }}
                min="0"
                className="form-control"
                placeholder="От"
              />
              <input
                type="text"
                value={maxPrice || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {  // Allow only numbers (digits)
                    setMaxPrice(Number(value));
                  }
                }}
                max="10000"
                className="form-control"
                placeholder="До"
              />
            <button onClick={reset}>Сбросить Фильтр</button>
            </div>
          </section>

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
                  style={{cursor:"pointer"}}
                    onClick={() => {
                      if (category.category_id === categoryId) {
                        setCategoryId(undefined);
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
          data-wow-delay="0.4s"
        >
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            <>
              <ul className="mt-productlisthold list-inline">
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
                                width={275}
                                height={290}
                              />
                            </Link>

                            <ul className="links">
                              <li>
                                <a
                                style={{cursor:"pointer"}}
                                  onClick={() =>
                                    addCart(
                                       product.product_id as number,
                                       product.product_price,
                                       1,
                                       // @ts-ignore
                                       product.product_images[0].image_patch
                                    )
                                  }
                                >
                                  <i className="icon-handbag"></i>
                                  <span>В корзину</span>
                                </a>
                              </li>
                              <li>
                               <FavoriteButton productId={product.product_id as number} productFeaturedData={productFeaturedData as IProductResponse} />
                              </li>
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
                        <strong className="title">
                          <Link href={`product/${product.product_id}`}>
                            {product.product_name}
                          </Link>
                        </strong>
                        <span className="price">
                          <span>{product.product_price}</span>
                          <i className="fa fa-rub"></i>{" "}
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
                      >
                        Назад
                      </button>
                    )}
                  </li>
                  <li>
                    {skip + limit < filteredProducts.length && ( // Only show if more products exist
                      <button onClick={() => handlePagination(skip + limit)}>
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
