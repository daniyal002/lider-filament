import { baseURL } from "@/api/interseptors";
import { useDeleteCartMutation, useUpdateCartMutation } from "@/hook/cartHook";
import useLocalCart from "@/hook/localStorageCartHook";
import { ICartResponseDetail } from "@/interface/cart";
import { getAccessToken } from "@/services/auth-token.service";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  cartItem: ICartResponseDetail;
}
export default function CartItem({ cartItem }: Props) {
  const [quantity, setQuantity] = useState<number>(cartItem.product_quantity);
  const { mutate: updateCartMutation } = useUpdateCartMutation();
  const { mutate: deleteCartMutation } = useDeleteCartMutation();
  const accessToken = getAccessToken();
  const { addLocalCart, removeLocalCart } = useLocalCart();

  const updateCart = (
    product_id: number,
    product_price: number,
    product_quantity: number
  ) => {
    accessToken
      ? updateCartMutation({
          product_name: cartItem.product_name,
          product_id: cartItem.product_id,
          product_quantity: product_quantity as number,
          cart_id: cartItem.cart_id,
          product_price: cartItem.product_price,
          product_image: cartItem.product_image,
        })
      : addLocalCart({ product_id, product_price, product_quantity },true);
  };

  const deleteCart = (
    product_id: number,
    product_price: number,
    product_quantity: number,
    cart_id: number
  ) => {
    accessToken
      ? deleteCartMutation({
          product_id,
          product_price,
          product_quantity,
          cart_id,
        })
      : removeLocalCart(product_id);
  };
  return (
    <div className="cart-row">
      <Link href={`product/${cartItem.product_id}`} className="img">
        <Image
          loader={() => `${baseURL}/${cartItem.product_image}`}
          src={`${baseURL}/${cartItem.product_image}`}
          alt="image"
          width={72}
          height={72}
          className="img-responsive"
        />
      </Link>
      <div className="mt-h">
        <span className="mt-h-title">
          <Link href={`product/${cartItem.product_id}`}>
            {cartItem.product_name}
          </Link>
        </span>
        <span className="price">
          <i className="fa fa-rub" aria-hidden="true"></i>{" "}
          {cartItem.product_price}
        </span>
        <span className="mt-h-title">
          <div
            className="row-val"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              outline: "none",
            }}
          >
            <label>Количество</label>
            <input
              type="number"
              id="qty"
              placeholder="1"
              min={1}
              value={quantity || 1}
              // defaultValue={cartItem.product_quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
                updateCart(
                  cartItem.product_id,
                  cartItem.product_price,
                  Number(e.target.value)
                );
              }}
              style={{
                width: "72px",
                fontSize: "18px",
                borderRadius: "25px",
                padding: "10px",
                border: "0",
              }}
            />
          </div>
        </span>
      </div>
      <button
        className="close fa fa-times"
        style={{ border: "0", backgroundColor: "transparent" }}
        onClick={() =>
          deleteCart(
            cartItem.product_id,
            cartItem.product_price,
            quantity as number,
            cartItem.cart_id as number
          )
        }
      ></button>
    </div>
  );
}
