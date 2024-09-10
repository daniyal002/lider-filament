"use client";

import { useCartUserData } from "@/hook/cartHook";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartData, isLoading } = useCartUserData();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    let summ = 0;
    cartData?.detail.forEach((cart) => {
      let summItem = cart.product_price * cart.product_quantity;
      summ += summItem;
    });
    setTotal(summ);
  }, [cartData]);
  return (
    <div className="mt-side-widget">
      {cartData?.detail &&
        cartData?.detail?.map((cartItem, index) => (
          <CartItem cartItem={cartItem} key={index}/>
        ))}

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
