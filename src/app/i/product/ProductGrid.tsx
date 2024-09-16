import { useCategoryData } from "@/hook/categoryHook";
import { useAddProductTopMutation, useDeleteProductMutation, useDeleteProductTopMutation, useProductTopData } from "@/hook/productHook";
import { IProductResponse, IProductResponseDetail } from "@/interface/product";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  productData: IProductResponse;
  setProductId: any;
  setProductType: any;
}

export default function ProductGrid({
  productData,
  setProductId,
  setProductType,
}: Props) {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [nameProduct, setNameProduct] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [categoryId, setCategoryId] = useState<number>();


  const { mutate: deleteProductMutation } = useDeleteProductMutation();
  const { mutate: addProductTopMutation } = useAddProductTopMutation();
  const { mutate: deleteProductTopMutation } = useDeleteProductTopMutation();
  const {productTopData} = useProductTopData()
  const { categoryData } = useCategoryData();

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
    <>
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
                type="number"
                value={minPrice}
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
                type="number"
                value={maxPrice}
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
              <h2>Категории</h2>
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
            <header className="mt-shoplist-header">
              <div className="btn-box">
                <button
                  className="drop-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setProductType("Создать");
                    setProductId(undefined);
                  }}
                >
                  Добавить товар
                </button>
              </div>
            </header>
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              <>
            <ul className="mt-productlisthold list-inline">
              {filteredProducts &&
                filteredProducts.slice(skip, skip + limit).map((product) => (
                  <li key={product.product_id}>
                    <div className="mt-product1 large">
                      <div className="box">
                        <div className="b1">
                          <div className="b2">
                        <Link href={`/product/${product.product_id}`}>
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
                            </Link>
                            <ul className="links">
                              <li>
                                <button
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                    setProductType("Изменить");
                                    setProductId(product.product_id);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <span>Редактировать</span>
                                </button>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    deleteProductMutation({
                                      ...product,
                                      category_id:
                                        product.product_category.category_id,
                                    })
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <Image
                                    src={"/trash.svg"}
                                    alt="Direct Image"
                                    width={23.78}
                                    height={20}
                                  />
                                </a>
                              </li>
                              {productTopData?.detail.find(top => top.product_id === product.product_id) ? (
                                <li>
                                <a
                                  onClick={() =>
                                    deleteProductTopMutation(product.product_id as number)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <Image
                                    src={"/icon/arrow-up-circle-fill.svg"}
                                    alt="Direct Image"
                                    width={23.78}
                                    height={20}
                                  />
                                </a>
                              </li>
                              ) : (
                                <li>
                                <a
                                  onClick={() =>
                                    addProductTopMutation(product.product_id as number)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <Image
                                    src={"/icon/arrow-up-circle.svg"}
                                    alt="Direct Image"
                                    width={23.78}
                                    height={20}
                                  />
                                </a>
                              </li>
                              )}
                              
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div 
                      className="txt"
                      style={{ textAlign: "left", padding: "0" }}>
                        <strong className="title">
                          {product?.product_category?.category_name}
                        </strong>
                        <strong className="title">
                          <a href="product-detail.html">
                            {product.product_name}
                          </a>
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
    </>
  );
}
