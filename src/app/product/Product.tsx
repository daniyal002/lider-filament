"use client";

import { baseURL } from "@/api/interseptors";
import { useCreateCartMutation } from "@/hook/cartHook";
import { useCategoryData } from "@/hook/categoryHook";
import {
  useAddProductFeaturedMutation,
  useDeleteProductFeaturedMutation,
  useProductData,
  useProductFeaturedData,
} from "@/hook/productHook";
import { IProductResponseDetail } from "@/interface/product";
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
  const { mutate: addProductFeaturedMutation } =
    useAddProductFeaturedMutation();
  const { mutate: deleteProductFeaturedMutation } =
    useDeleteProductFeaturedMutation();
  const { productFeaturedData } = useProductFeaturedData();
  const { mutate: createCartMutation } = useCreateCartMutation();

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
                                  onClick={() =>
                                    createCartMutation({
                                      product_id: product.product_id as number,
                                      product_price: product.product_price,
                                      product_quantity: 1,
                                    })
                                  }
                                >
                                  <i className="icon-handbag"></i>
                                  <span> в корзину</span>
                                </a>
                              </li>
                              <li>
                                {productFeaturedData?.detail.find(
                                  (productFeature) =>
                                    productFeature.product_id ===
                                    product.product_id
                                ) ? (
                                  <button
                                    style={{
                                      border: "0",
                                      backgroundColor: "transparent",
                                      color: "red",
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
