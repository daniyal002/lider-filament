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
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Product() {
  const { productData } = useProductData("0", "10");
  const { categoryData } = useCategoryData();
  const { mutate: addProductFeaturedMutation } =
    useAddProductFeaturedMutation();
  const { mutate: deleteProductFeaturedMutation } =
    useDeleteProductFeaturedMutation();
  const { productFeaturedData } = useProductFeaturedData();

  const {mutate:createCartMutation} = useCreateCartMutation()

  

  // State for price range filter
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(599);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to handle price filtering
  const handlePriceFilter = () => {
    const filtered = productData?.detail.filter(
      (product) =>
        product.product_price >= minPrice && product.product_price <= maxPrice
    );
    // setFilteredProducts(filtered);
  };

  return (
    <div className="container">
      <div className="row">
        <aside
          id="sidebar"
          className="col-xs-12 col-sm-4 col-md-3 wow fadeInLeft"
          data-wow-delay="0.4s"
        >
          <section className="shop-widget filter-widget bg-grey">
            <h2>FILTER</h2>

            <span className="sub-title">Filter by Price</span>
            <div className="price-range">
              <div className="">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  min="0"
                  className="form-control"
                  placeholder="Min Price"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  max="10000"
                  className="form-control"
                  placeholder="Max Price"
                />
              </div>
              <span className="price">
                Price &nbsp; $ {minPrice} &nbsp; - &nbsp; $ {maxPrice}
              </span>
              <button className="filter-btn" onClick={handlePriceFilter}>
                Filter
              </button>
            </div>
          </section>
          <section className="shop-widget">
            <h2 style={{
              background: "linear-gradient(297deg, #9CD0FF, #A95BF3, #9CD0FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:"transparent"
            }}>Категории</h2>
            <ul className="list-unstyled category-list">
              {categoryData?.detail.map((category) => (
                <li key={category.category_id}>
                  <a href="#">
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
          <header className="mt-shoplist-header">
            <div className="btn-box">
              <a href="#" className="drop-link">
                Default Sorting
              </a>
            </div>
          </header>
          <ul className="mt-productlisthold list-inline">
            {(filteredProducts.length > 0
              ? filteredProducts
              : productData?.detail
            )?.map((product) => (
              <li key={product.product_id}>
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
              </li>
            ))}
          </ul>
          <nav className="mt-pagination">
            <ul className="list-inline">
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
