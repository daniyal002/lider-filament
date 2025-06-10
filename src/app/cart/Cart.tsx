"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useProductData } from "@/hook/productHook";
import useLocalCart from "@/hook/localStorageCartHook";
import { getAccessToken } from "@/services/auth-token.service";
import { ICartResponseDetail } from "@/interface/cart";
import { useCartUserData } from "@/hook/cartHook";
import { sendTelegramMessageFromCart } from "@/helper/telegram";
import { IProductResponseDetail } from "@/interface/product";
import { useHookFormMask } from "use-mask-input";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { SquareArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/UI/BackButton";

export default function Cart() {
  const {
    register,
    getValues
  } = useForm();
  const { productData } = useProductData();
  const { cartData } = useCartUserData();
  const [total, setTotal] = useState<number>(0);
  const { getLocalCart } = useLocalCart();
  const [localCart, setLocalCart] = useState(() => getLocalCart() || []);
  const accessToken = getAccessToken();

  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(false); // Состояние для показа инпута
  const registerWithMask = useHookFormMask(register);


  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = getLocalCart();
      setLocalCart(updatedCart || []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [filteredProducts, setFilteredProducts] = useState<
    ICartResponseDetail[]
  >([]);

  useEffect(() => {
    const filtered = productData?.detail
      .filter((product) =>
        localCart.some((cartItem) => cartItem.product_id === product.product_id)
      )
      .map((filteredProduct) => {
        const cartItem = localCart.find(
          (item) => item.product_id === filteredProduct.product_id
        );
        return {
          ...filteredProduct,
          //@ts-ignore
          product_image: filteredProduct?.product_images[0]?.image_patch,
          product_quantity: cartItem?.product_quantity,
          product_price: cartItem?.product_price,
          product_additional_prices:cartItem?.product_additional_prices
        };
      });
    setFilteredProducts(filtered as ICartResponseDetail[]);
  }, [productData, localCart]);

  useEffect(() => {
    let summ = 0;
    if (accessToken) {
      cartData?.detail.forEach((cart) => {
        let summItem = cart.product_price * cart.product_quantity;
        summ += summItem;
      });
    } else {
      localCart.forEach((cart) => {
        // Sort additional prices in descending order of product_from
        const applicablePrice =
          cart.product_additional_prices
            ?.sort((a, b) => Number(b.product_from) - Number(a.product_from))
            .find((price) => cart.product_quantity >= Number(price.product_from))
            ?.product_additional_price || cart.product_price;

        let summItem = Number(applicablePrice) * cart.product_quantity;
        summ += summItem;
      });
    }
    setTotal(summ);
  }, [cartData, accessToken, localCart]);
  const handleSendMessage = () => {
    if (!getValues('phone')) {
      alert("Введите номер телефона перед оплатой!");
      return;
    }
    // Отправка сообщения в Telegram
    sendTelegramMessageFromCart(getValues('phone'),localCart, productData?.detail as IProductResponseDetail[]);
  };
  const { back } = useRouter();

  return (
    <div className="mt-side-widget" style={{ paddingTop: "0" }}>
      <div style={{marginBottom:"15px"}}>
      <BackButton />
      </div>

      <Toaster toastOptions={{ duration: 5000 }} />

      {accessToken
        ? cartData?.detail?.map((cartItem, index) => (
            <CartItem cartItem={cartItem} key={index} />
          ))
        : filteredProducts?.map((cartItem, index) => (
            <CartItem cartItem={cartItem} key={index} />
          ))}

      <div className="cart-row-total">
        <span className="mt-total">Итого</span>
        <span className="mt-total-txt">{total} ₽</span>
      </div>
      <div className="cart-btn-row">
        {!showPhoneInput
          ? (filteredProducts?.length as number) > 0 && (
              <button
                className="btn-type3"
                onClick={() => setShowPhoneInput(true)} // Показать инпут для телефона
              >
                Оформить заказ
              </button>
            )
          : (filteredProducts?.length as number) > 0 && (
              <div className="phone-input-container">
                <input
                  className="input"
                  type="tel"
                  inputMode="tel"
                  placeholder="Введите номер телефона"
                  {...registerWithMask("phone", ["8(999)-999-99-99"])}
                />
                <button
                  className="btn-type3"
                  onClick={handleSendMessage} // Отправка сообщения
                >
                  Отправить
                </button>
              </div>
            )}
      </div>
    </div>
  );
}
