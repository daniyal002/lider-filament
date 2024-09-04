import { useDeleteProductMutation } from "@/hook/productHook";
import { IProductResponse } from "@/interface/product";
import Image from "next/image";
import React from "react";

interface Props {
  productData: IProductResponse;
  setProductId:any
  setProductType:any
}

export default function ProductGrid({ productData,setProductId,setProductType }: Props) {
    const {mutate:deleteProductMutation} = useDeleteProductMutation()

  return (
    <>
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
                <div className="range-slider">
                  <span className="dot"></span>
                  <span className="dot dot2"></span>
                </div>
                <span className="price">
                  Price &nbsp; $ 10 &nbsp; - &nbsp; $ 599
                </span>
                <a href="#" className="filter-btn">
                  Filter
                </a>
              </div>
            </section>
            <section className="shop-widget">
              <h2>CATEGORIES</h2>
              <ul className="list-unstyled category-list">
                <li>
                  <a href="#">
                    <span className="name">CHAIRS</span>
                    <span className="num">12</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="name">SOFAS</span>
                    <span className="num">24</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="name">ARMCHAIRS</span>
                    <span className="num">9</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="name">BEDROOM</span>
                    <span className="num">2</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="name">LIGHTING</span>
                    <span className="num">17</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="name">KITCHEN</span>
                    <span className="num">10</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="name">ACCESSORIES</span>
                    <span className="num">23</span>
                  </a>
                </li>
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
                  onClick={()=> {setProductType("Создать");setProductId(undefined)}}
                >
                  Добавить товар
                </button>
              </div>
            </header>
            <ul className="mt-productlisthold list-inline">
              {productData &&
                productData?.detail.map((product) => (
                  <li>
                    <div className="mt-product1 large">
                      <div className="box">
                        <div className="b1">
                          <div className="b2">
                            <a href="product-detail.html">
                              <img
                                src="http://placehold.it/275x290"
                                alt="image description"
                              />
                            </a>
                            <ul className="mt-stars">
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                              <li>
                                <i className="fa fa-star"></i>
                              </li>
                              <li>
                                <i className="fa fa-star-o"></i>
                              </li>
                            </ul>
                            <ul className="links">
                              <li>
                                <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {setProductType("Изменить");setProductId(product.product_id)}}
                                style={{cursor:"pointer"}}>
                                  <span>Редактировать</span>
                                </button>
                              </li>
                              <li>
                                <a onClick={() => deleteProductMutation({...product, category_id:product.product_category.category_id})} style={{cursor:"pointer"}}>
                                  <Image
                                    src={"/trash.svg"}
                                    alt="Direct Image"
                                    width={23.78}
                                    height={20}
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="txt">
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
    </>
  );
}
