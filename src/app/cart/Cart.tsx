'use client'
import { useCartUserData } from "@/hook/cartHook";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useProductData } from "@/hook/productHook";
import useLocalCart from "@/hook/localStorageCartHook";
import { getAccessToken } from "@/services/auth-token.service";
import { ICartResponseDetail } from "@/interface/cart";

export default function Cart() {
  const { productData } = useProductData();
  const { cartData, isLoading } = useCartUserData();
  const [total, setTotal] = useState<number>();
  const { getLocalCart } = useLocalCart();
  const accessToken = getAccessToken();

  const [filteredProducts, setFilteredProducts] = useState<ICartResponseDetail[]>([])

  useEffect(()=>{
    const filtered = productData?.detail.filter(product =>
      getLocalCart().some(cartItem => cartItem.product_id === product.product_id)
    ).map(filteredProduct => {
      const cartItem = getLocalCart().find(item => item.product_id === filteredProduct.product_id);
      // @ts-ignore
      return {...filteredProduct, product_image:filteredProduct?.product_images[0]?.image_patch,product_quantity: cartItem?.product_quantity, product_price: cartItem?.product_price};
    });
    setFilteredProducts(filtered as ICartResponseDetail[]);
  }, [productData])




  useEffect(() => {
    let summ = 0;
    if (accessToken) {
      cartData?.detail.forEach((cart) => {
        let summItem = cart.product_price * cart.product_quantity;
        summ += summItem;
      });
    } else {
      const localCart = getLocalCart();
      localCart.forEach((cart) => {
        let summItem = cart.product_price * cart.product_quantity;
        summ += summItem;
      });
    }
    setTotal(summ);
  }, [cartData, accessToken]);

  return (
    <div className="mt-side-widget">
      {accessToken ? (
        cartData?.detail &&
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