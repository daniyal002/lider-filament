import { baseURL } from "@/api/interseptors";
import { useDeleteCartMutation, useUpdateCartMutation } from "@/hook/cartHook";
import useLocalCart from "@/hook/localStorageCartHook";
import { ICartResponseDetail } from "@/interface/cart";
import { product_additional_prices } from "@/interface/product";
import { getAccessToken } from "@/services/auth-token.service";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  cartItem: ICartResponseDetail;
}
export default function CartItem({ cartItem }: Props) {
  const [quantity, setQuantity] = useState<number>(cartItem.product_quantity);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(
    cartItem.product_price
  );
  const { mutate: updateCartMutation } = useUpdateCartMutation();
  const { mutate: deleteCartMutation } = useDeleteCartMutation();
  const accessToken = getAccessToken();
  const { addLocalCart, removeLocalCart } = useLocalCart();
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to calculate the applicable price
  const calculatePrice = (
    basePrice: number,
    additionalPrices: product_additional_prices[],
    quantity: number
  ) => {
    // Sort additional prices in descending order of product_from
    const applicablePrice =
      additionalPrices
        ?.sort((a, b) => Number(b.product_from) - Number(a.product_from))
        .find((price) => quantity >= Number(price.product_from))
        ?.product_additional_price || basePrice;

    return applicablePrice;
  };

  // Update calculated price whenever quantity changes
  useEffect(() => {
    const newPrice = calculatePrice(
      cartItem.product_price,
      cartItem.product_additional_prices || [],
      quantity
    );
    setCalculatedPrice(newPrice);
  }, [quantity, cartItem.product_price, cartItem.product_additional_prices]);

  const updateCart = (
    product_id: number,
    product_price: number,
    product_quantity: number,
    product_additional_prices: product_additional_prices[]
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
      : addLocalCart(
          {
            product_id,
            product_price,
            product_quantity,
            product_additional_prices,
          },
          true
        );
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
    <div
      className="cart-row"
      style={{
        border: "1px solid #551A8B",
        minHeight: "134px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <Link href={`product/${cartItem.product_id}`} className="img">
          <Image
            loader={() => `${baseURL}/${cartItem.product_image}`}
            src={`${baseURL}/${cartItem.product_image}`}
            alt="image"
            width={100}
            height={100}
            className="img-responsive"
            style={{ borderRight: "1px solid #551A8B" }}
          />
        </Link>
        <div className="mt-h">
          <span className="mt-h-title" style={{ marginBottom: "10px" }}>
            <Link
              href={`product/${cartItem.product_id}`}
              style={{ fontSize: "24px", color: "#fff" }}
            >
              {cartItem.product_name}
            </Link>
          </span>
          <span className="price" style={{ fontSize: "20px" }}>
            {calculatedPrice} ₽/кг
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
                marginTop: "10px",
              }}
            >
              {/* <label>Количество</label> */}
              <i
                className="bi bi-dash-circle"
                style={{
                  fontSize: "20px",
                  color: "#a663e3",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setQuantity((prev) => prev - 1);
                  updateCart(
                    cartItem.product_id,
                    cartItem.product_price,
                    quantity - 1,
                    cartItem.product_additional_prices as product_additional_prices[]
                  );
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
                  if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }

                  if (e.key === "Enter") {
                    const qty = quantity < 1 ? 1 : quantity;
                    setQuantity(qty);
                    updateCart(
                      cartItem.product_id,
                      cartItem.product_price,
                      qty,
                      cartItem.product_additional_prices as product_additional_prices[]
                    );
                    inputRef.current?.blur();
                  }
                }}
                onPaste={(e) => {
                  const paste = e.clipboardData.getData("text");
                  if (!/^\d+$/.test(paste)) {
                    e.preventDefault();
                  }
                }}
                onBlur={() => {
                  if (!quantity || quantity < 1) {
                    setQuantity(1);
                    updateCart(
                      cartItem.product_id,
                      cartItem.product_price,
                      1,
                      cartItem.product_additional_prices as product_additional_prices[]
                    );
                  } else {
                    updateCart(
                      cartItem.product_id,
                      cartItem.product_price,
                      quantity,
                      cartItem.product_additional_prices as product_additional_prices[]
                    );
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
                  fontSize: "18px",
                  borderRadius: "25px",
                  padding: "0 0 0 15px",
                  border: "1px solid #a663e3",
                  outline: "none",
                }}
              />

              <i
                className="bi bi-plus-circle"
                style={{
                  fontSize: "20px",
                  color: "#a663e3",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  updateCart(
                    cartItem.product_id,
                    cartItem.product_price,
                    quantity + 1,
                    cartItem.product_additional_prices as product_additional_prices[]
                  );
                }}
              ></i>
            </div>
          </span>
        </div>
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
