"use client";
import { baseURL } from "@/api/interseptors";
import {
  useAddProductFeaturedMutation,
  useDeleteProductFeaturedMutation,
  useProductDataById,
  useProductFeaturedData,
} from "@/hook/productHook";
import Image from "next/image";
import Link from "next/link";
import "./ProductDetail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { useCreateCartMutation } from "@/hook/cartHook";
import useLocalFavorites from "@/hook/localStorageFavoriteHook";
import { getAccessToken } from "@/services/auth-token.service";
import useLocalCart from "@/hook/localStorageCartHook";

interface Props {
  productId: string;
}

export default function ProductDetail({ productId }: Props) {
  const { productByIdData } = useProductDataById(productId);

  const { mutate: addProductFeaturedMutation } =
    useAddProductFeaturedMutation();
  const { mutate: deleteProductFeaturedMutation } =
    useDeleteProductFeaturedMutation();
  const { productFeaturedData } = useProductFeaturedData();
  const {mutate:createCartMutation} = useCreateCartMutation()

  const [quantity, setQuantity] = useState<number>(1)

  const { getLocalFavorites,addLocalFavorite,removeLocalFavorite } = useLocalFavorites();
  const {addLocalCart} = useLocalCart()
  const localFavorites = getLocalFavorites()
  const accessToken = getAccessToken()

  const addCart = (product_id:number,product_price:number,product_quantity:number = 1, product_image:string) => {
    accessToken ? createCartMutation({product_id,product_price,product_quantity,product_image}) : addLocalCart({product_id,product_price,product_quantity})
  }

  return (
    <section className="mt-product-detial wow fadeInUp" data-wow-delay="0.4s">
      <div className="container">
        <div className="row">
          <div
            className="col-xs-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              flexWrap: "wrap",
              paddingTop: "40px",
            }}
          >
            {productByIdData?.detail.product_images?.length ? (
              <Swiper
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                  clickable: true,
                }}
                autoplay
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={{ maxWidth: "500px" }}
              >
                {productByIdData?.detail?.product_images.map((img,index) => (
                  <SwiperSlide key={index}>
                     <span
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        marginBottom:"10px"
                      }}
                    >
                      <i className="fa fa-heart" style={{ color: "red" }}></i>
                      {productByIdData?.detail.featured_count}
                    </span>
                    <Image
                      loader={() => `${baseURL}/${img.image_patch}`}
                      src={`${baseURL}/${img.image_patch}`}
                      alt={img.image_name}
                      width={300}
                      height={500}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              ""
            )}
            <div className="detial-holder">
              <ul className="list-unstyled breadcrumbs">
                <li>
                  <Link href="/product">Продукты</Link>
                  <i className="fa fa-angle-right"></i>
                </li>
                <li>{productByIdData?.detail.product_name}

                </li>
              </ul>
              <h2>{productByIdData?.detail.product_name}</h2>
              <div className="text-holder">
                <span className="price">
                  {productByIdData?.detail.product_price} ₽
                </span>
              </div>
              <form
                action="#"
                className="product-form"
                style={{ marginBottom: "40px" }}
              >
                <fieldset>
                  <div className="row-val">
                    <label>Количество</label>
                    <input type="number" id="qty" placeholder="1" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>
                  </div>
                  <div className="row-val">
                    <button type="button" onClick={() => {
                        addCart(productByIdData?.detail.product_id as number,productByIdData?.detail.product_price as number,quantity,
                          // @ts-ignore
                          productByIdData?.detail.product_images[0].image_patch)
                    }}>В КОРЗИНУ</button>
                  </div>
                </fieldset>
              </form>
              <div className="txt-wrap">{productByIdData?.detail.note}</div>
              <div className="txt-wrap">
                Размер: {productByIdData?.detail.product_size}
              </div>
              <div className="txt-wrap">
                Вес: {productByIdData?.detail.product_weight} грамм
              </div>
              <div className="txt-wrap">
                Цвет: {productByIdData?.detail.product_color}
              </div>
              <div className="txt-wrap">
                Категория:{" "}
                {productByIdData?.detail.product_category.category_name}
              </div>
              <ul
                className="list-unstyled list"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <li>
                  <a>
                    <i className="fa fa-share-alt"></i>ПОДЕЛИТЬСЯ
                  </a>
                </li>
                <li>
                  {accessToken ? (
                     <a>
                     {productFeaturedData?.detail.find(
                       (productFeature) =>
                         productFeature.product_id === Number(productId)
                     ) ? (
                       <button
                         style={{
                           border: "0",
                           backgroundColor: "transparent",
                           color: "red",
                           display: "flex",
                           gap: "10px",
                           padding: "0",
                         }}
                         onClick={() =>
                           deleteProductFeaturedMutation(Number(productId))
                         }
                       >
                         <i className="bi bi-heart-fill"></i>
                         УБРАТЬ ИЗ ИЗБРАННОГО
                       </button>
                     ) : (
                       <button
                         style={{
                           border: "0",
                           backgroundColor: "transparent",
                           display: "flex",
                           gap: "10px",
                           padding: "0",
                         }}
                         onClick={() =>
                           addProductFeaturedMutation(Number(productId))
                         }
                       >
                         <i className="bi bi-heart-fill"></i>В ИЗБРАННОЕ
                       </button>
                     )}
                   </a>
                  ): (
                  <a>
                    {localFavorites?.find(
                      (productFeature) =>
                        productFeature === Number(productId)
                    ) ? (
                      <button
                        style={{
                          border: "0",
                          backgroundColor: "transparent",
                          color: "red",
                          display: "flex",
                          gap: "10px",
                          padding: "0",
                        }}
                        onClick={() =>
                          removeLocalFavorite(Number(productId))
                        }
                      >
                        <i className="bi bi-heart-fill"></i>
                        УБРАТЬ ИЗ ИЗБРАННОГО
                      </button>
                    ) : (
                      <button
                        style={{
                          border: "0",
                          backgroundColor: "transparent",
                          display: "flex",
                          gap: "10px",
                          padding: "0",
                        }}
                        onClick={() =>
                          addLocalFavorite(Number(productId))
                        }
                      >
                        <i className="bi bi-heart-fill"></i>В ИЗБРАННОЕ
                      </button>
                    )}
                  </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
