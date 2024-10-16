'use client'
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useProductData } from "@/hook/productHook";
import useLocalCart from "@/hook/localStorageCartHook";
import { getAccessToken } from "@/services/auth-token.service";
import { ICartResponseDetail } from "@/interface/cart";
import { useCartUserData } from "@/hook/cartHook";

export default function Cart() {
  const { productData } = useProductData();
  const { cartData } = useCartUserData();
  const [total, setTotal] = useState<number>(0);
  const { getLocalCart } = useLocalCart();
  const [localCart, setLocalCart] = useState(() => getLocalCart() || []);
  const accessToken = getAccessToken();

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = getLocalCart();
      console.log("Updated cart from localStorage:", updatedCart);
      setLocalCart(updatedCart || []);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Для логирования изменений в localCart
  useEffect(() => {
    console.log("Local cart updated:", localCart);
  }, [localCart]);

  const [filteredProducts, setFilteredProducts] = useState<ICartResponseDetail[]>([]);

  useEffect(() => {
    const filtered = productData?.detail.filter(product =>
      localCart.some(cartItem => cartItem.product_id === product.product_id)
    ).map(filteredProduct => {
      const cartItem = localCart.find(item => item.product_id === filteredProduct.product_id);
      return {
        ...filteredProduct,
        //@ts-ignore
        product_image: filteredProduct?.product_images[0]?.image_patch,
        product_quantity: cartItem?.product_quantity,
        product_price: cartItem?.product_price
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
        let summItem = cart.product_price * cart.product_quantity;
        summ += summItem;
      });
    }
    setTotal(summ);
  }, [cartData, accessToken, localCart]);

  return (
    <div className="mt-side-widget">
      {accessToken ? (
        cartData?.detail?.map((cartItem, index) => (
          <CartItem cartItem={cartItem} key={index} />
        ))
      ) : (
        filteredProducts?.map((cartItem, index) => (
          <CartItem cartItem={cartItem} key={index} />
        ))
      )}

      <div className="cart-row-total">
        <span className="mt-total">Итого</span>
        <span className="mt-total-txt">
          {total} <i className="fa fa-rub" aria-hidden="true"></i>
        </span>
      </div>
      <div className="cart-btn-row">
        <a href="#" className="btn-type3">
          К оплате
        </a>
      </div>
    </div>
  );
}