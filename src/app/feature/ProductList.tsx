import { baseURL } from "@/api/interseptors";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { IProductResponse, IProductResponseDetail } from "@/interface/product";
import Image from "next/image";
import Link from "next/link";

interface Props {
  filteredProducts: IProductResponseDetail[];
  skip: number;
  limit: number;
  addCart: (product_id:number,product_price:number,product_quantity:number,product_image:string) => void;
  handlePagination: (newSkip: number) => void;
  productFeaturedData: IProductResponse | undefined;
}

export default function ProductList({ filteredProducts, skip, limit, addCart, handlePagination, productFeaturedData }:Props) {
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
                          <Link href={`product/${product.product_id}`}>
                            <Image
                              loader={() => `${baseURL}/${product?.product_images && product?.product_images[0]?.image_patch}`}
                              src={`${baseURL}/${product?.product_images && product?.product_images[0]?.image_patch}`}
                              alt={String(product.product_id)}
                              width={275}
                              height={290}
                            />
                          </Link>

                          <ul className="links">
                            <li>
                              <a style={{ cursor: "pointer" }} onClick={() => addCart( product.product_id as number, product.product_price,1,
                              // @ts-ignore
                                product?.product_images[0].image_patch)}>
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