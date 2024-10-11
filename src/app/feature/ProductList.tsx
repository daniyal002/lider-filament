import { baseURL } from "@/api/interseptors";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { ICartRequset } from "@/interface/cart";
import { IProductResponse, IProductResponseDetail } from "@/interface/product";
import Image from "next/image";

interface Props {
  filteredProducts: IProductResponseDetail[];
  skip: number;
  limit: number;
  createCartMutation: (data: ICartRequset) => void;
  handlePagination: (newSkip: number) => void;
  productFeaturedData: IProductResponse | undefined;
}

export default function ProductList({ filteredProducts, skip, limit, createCartMutation, handlePagination, productFeaturedData }:Props) {
    return (
      <div className="col-xs-12 col-sm-8 col-md-9 wow fadeInRight" data-wow-delay="0.4s">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          <>
            <ul className="mt-productlisthold list-inline">
              {filteredProducts.slice(skip, skip + limit).map((product) => (
                <li key={product.product_id}>
                  <div className="mt-product1 large">
                    <div className="box">
                      <div className="b1">
                        <div className="b2">
                          <a href="product-detail.html">
                            <Image
                              loader={() => `${baseURL}/${product?.product_images && product?.product_images[0]?.image_patch}`}
                              src={`${baseURL}/${product?.product_images && product?.product_images[0]?.image_patch}`}
                              alt={String(product.product_id)}
                              width={275}
                              height={290}
                            />
                          </a>

                          <ul className="links">
                            <li>
                              <a style={{ cursor: "pointer" }} onClick={() => createCartMutation({ product_id: product.product_id as number, product_price: product.product_price, product_quantity: 1 })}>
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
                    <div className="txt" style={{ textAlign: "left", padding: "0" }}>
                      <strong className="title">{product?.product_category?.category_name}</strong>
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
                  {skip > 0 && (
                    <button onClick={() => handlePagination(skip - limit)} disabled={skip <= 0}>
                      Назад
                    </button>
                  )}
                </li>
                <li>
                  {skip + limit < filteredProducts.length && (
                    <button onClick={() => handlePagination(skip + limit)}>Вперед</button>
                  )}
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <p>Нет продуктов</p>
        )}
      </div>
    );
  }