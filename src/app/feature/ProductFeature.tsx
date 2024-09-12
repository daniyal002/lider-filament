"use client";

import { useCategoryData } from "@/hook/categoryHook";
import {
  useDeleteProductFeaturedMutation,
  useProductFeaturedData,
} from "@/hook/productHook";
import Image from "next/image";
import { useState } from "react";

export default function ProductFeature() {
  const [page, setPage] = useState<number>(1);  // Текущая страница
  const limit = 3;  // Количество продуктов на странице

  const { categoryData } = useCategoryData();
  const { mutate: deleteProductFeaturedMutation } =
    useDeleteProductFeaturedMutation();
  const { productFeaturedData, isLoading } = useProductFeaturedData();

  // Если данные ещё загружаются
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Начальный и конечный индекс для текущей страницы
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Продукты для отображения на текущей странице
  const paginatedProducts = productFeaturedData?.detail.slice(startIndex, endIndex);

  // Количество страниц
  // @ts-ignore
  const totalPages = Math.ceil(productFeaturedData?.detail?.length / limit);

  // Обработчик смены страницы
  const handlePageChange = (newPage:number) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <div className="row">
        <aside
          id="sidebar"
          className="col-xs-12 col-sm-4 col-md-3 wow fadeInLeft"
          data-wow-delay="0.4s"
        >
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
            {paginatedProducts?.map((product) => (
              <li key={product.product_id}>
                <div className="mt-product1 large">
                  <div className="box">
                    <div className="b1">
                      <div className="b2">
                        <a href="product-detail.html">
                          <Image
                            loader={() =>
                              `http://192.168.30.153:8001/${
                                product?.product_images &&
                                product?.product_images[0]?.image_patch
                              }`
                            }
                            src={`http://192.168.30.153:8001/${
                              product?.product_images &&
                              product?.product_images[0]?.image_patch
                            }`}
                            alt={String(product.product_id)}
                            width={275}
                            height={290}
                          />
                        </a>

                        <ul className="links">
                          <li>
                            <a href="#">
                              <i className="icon-handbag"></i>
                              <span>Add to Cart</span>
                            </a>
                          </li>
                          <li>
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
          {/* Пагинация */}
          <nav className="mt-pagination">
            <ul className="list-inline" style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
              <li>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Назад
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                  <a
                    onClick={() => handlePageChange(index + 1)}
                    className={page === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                  Вперед
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
