"use client";
import { baseURL } from "@/api/interseptors";
import { useProductDataById } from "@/hook/productHook";
import Image from "next/image";
import Link from "next/link";
import "./ProductDetail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { useCreateCartMutation } from "@/hook/cartHook";
import useLocalFavorites from "@/hook/localStorageFavoriteHook";
import { getAccessToken } from "@/services/auth-token.service";
import useLocalCart from "@/hook/localStorageCartHook";
import { Toaster } from "react-hot-toast";
import { product_additional_prices } from "@/interface/product";
import { useRouter } from "next/navigation";
import { SquareArrowLeft } from "lucide-react";
import BackButton from "@/components/UI/BackButton";

interface Props {
  productId: string;
}

export default function ProductDetail({ productId }: Props) {
  const { productByIdData } = useProductDataById(productId);
  const { mutate: createCartMutation } = useCreateCartMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  const [quantity, setQuantity] = useState<number>(1);

  const { getLocalFavorites, addLocalFavorite, removeLocalFavorite } =
    useLocalFavorites();
  const { addLocalCart } = useLocalCart();
  const localFavorites = getLocalFavorites();
  const accessToken = getAccessToken();

  const { push,back } = useRouter();

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

  const [isClickCartB, setIsClickCartB] = useState(false);

  return (
    <section className="mt-product-detial wow fadeInUp" data-wow-delay="0.4s">
      <Toaster />
      <div className="container">
        <BackButton />

        <div className="row">
          <div
            className="col-xs-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // rowGap: "30px",
              flexWrap: "wrap",
              // paddingTop: "40px",
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
                style={{ maxWidth: "290px" }}
              >
                {productByIdData?.detail?.product_images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      loader={() => `${baseURL}/${img.image_patch}`}
                      src={`${baseURL}/${img.image_patch}`}
                      alt={img.image_name}
                      width={300}
                      height={400}
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
                  <Link href="/product">Товары</Link>
                  <i className="fa fa-angle-right"></i>
                </li>
                <li>{productByIdData?.detail.product_name}</li>
              </ul>
              <h2 style={{ fontWeight: "bold" }}>
                {productByIdData?.detail.product_name}
              </h2>
              <div className="text-holder">
                <span className="price">
                  {productByIdData?.detail.product_price} ₽/кг
                </span>
              </div>

              <div className="row-val product_additional_prices">
                {productByIdData?.detail.product_additional_prices?.map(
                  (product_additional_price) => (
                    <div
                      key={product_additional_price.additional_price_id}
                      className="product_additional_price"
                    >
                      <span
                        className="price"
                        style={{ fontSize: "25px", fontWeight: "bold" }}
                      >
                        {" "}
                        От {product_additional_price.product_from} кг:
                      </span>
                      <span
                        className="price"
                        style={{ fontSize: "25px", fontWeight: "bold" }}
                      >
                        {" "}
                        {product_additional_price.product_additional_price} ₽/кг
                      </span>
                    </div>
                  )
                )}
              </div>

              <form
                action="#"
                className="product-form"
                style={{ marginBottom: "15px" }}
              >
                <fieldset
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    alignItems: "start",
                    flexDirection: "column",
                    justifyContent: "center",
                    maxWidth: "150px",
                    width: "100%",
                  }}
                >
                  <div
                    className="row-val"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {/* <label>Количество</label> */}
                    <i
                      className="bi bi-dash-circle"
                      style={{
                        fontSize: "30px",
                        color: "#a663e3",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
                      }}
                    ></i>
                    <input
                      type="text" // меняем type на "text" — он не позволяет вводить буквы, но сохраняем контроль
                      inputMode="numeric"
                      pattern="\d*"
                      id="qty"
                      placeholder="0"
                      min={1}
                      value={quantity === 0 ? "" : quantity}
                      onChange={(e) => {
                        const inputVal = e.target.value;
                        // Удаляем всё, кроме цифр
                        const cleaned = inputVal.replace(/\D/g, "");

                        if (cleaned === "") {
                          setQuantity(0);
                        } else {
                          const newQuantity = Number(cleaned);
                          if (!isNaN(newQuantity)) {
                            setQuantity(newQuantity);
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        // Разрешаем только цифры, Backspace, Delete, Arrow keys
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];
                        if (
                          !/^\d$/.test(e.key) &&
                          !allowedKeys.includes(e.key)
                        ) {
                          e.preventDefault();
                        }

                        if (e.key === "Enter") {
                          const qty = quantity < 1 ? 1 : quantity;
                          setQuantity(qty);
                        }
                      }}
                      onPaste={(e) => {
                        const paste = e.clipboardData.getData("text");
                        if (!/^\d+$/.test(paste)) {
                          e.preventDefault();
                        }
                      }}
                      onFocus={() => {
                        setTimeout(() => {
                          inputRef.current?.select();
                        }, 0);
                      }}
                      ref={inputRef}
                       style={{
                        background: "rgba(134, 155, 223, 0.14)",
                        color: "#a663e3",
                        width: "70px",
                        fontSize: "20px",
                        borderRadius: "25px",
                        padding: "0 0 0 0",
                        border: "1px solid #a663e3",
                        outline: "none",
                        height: "28px",
                        textAlign:"center"
                      }}
                    />
                    <i
                      className="bi bi-plus-circle"
                      style={{
                        fontSize: "30px",
                        color: "#a663e3",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setQuantity((prev) => prev + 1);
                      }}
                    ></i>
                  </div>

                  <div className="row-val" style={{ width: "100%" }}>
                    <button
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => {
                        if (isClickCartB) {
                          push("/cart");
                          setIsClickCartB(false); // необязательно, если не нужно сбрасывать
                        } else {
                          addCart(
                            productByIdData?.detail.product_id as number,
                            productByIdData?.detail.product_price as number,
                            quantity,
                            // @ts-ignore
                            productByIdData?.detail.product_images[0]
                              .image_patch,
                            productByIdData?.detail.product_additional_prices
                          );
                          setIsClickCartB(true);
                        }
                      }}
                    >
                      В КОРЗИНУ
                    </button>
                  </div>
                </fieldset>
              </form>

              <div className="txt-wrap" style={{ color: "white" }}>
                {productByIdData?.detail.note}
              </div>
              <div className="txt-wrap" style={{ color: "white" }}>
                Размер: {productByIdData?.detail.product_size}
              </div>
              <div className="txt-wrap" style={{ color: "white" }}>
                Вес: {productByIdData?.detail.product_weight} грамм
              </div>
              <div className="txt-wrap" style={{ color: "white" }}>
                Цвет: {productByIdData?.detail.product_color}
              </div>
              <div className="txt-wrap" style={{ color: "white" }}>
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
                  <a
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: document.title,
                            url: window.location.href,
                          })
                          .catch((error) => "");
                      } else {
                      }
                    }}
                    style={{ color: "white", cursor: "pointer" }}
                  >
                    <i
                      className="fa fa-share-alt"
                      style={{ color: "white" }}
                    ></i>
                    ПОДЕЛИТЬСЯ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
