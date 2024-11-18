'use client'
import { useUserOrdersData } from "@/hook/orderHook";
import React from "react";
import style from "./OrderList.module.scss";

export default function OrderList() {
  const formattedDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const { userOrdersData } = useUserOrdersData();

  return (
    <div className={style.orderList}>
      {userOrdersData?.map((order) => (
        <div className={style.orderListItem} key={order.order_number}>
          <p className={style.orderDate}>Дата создания заявки - {formattedDateTime(order.created_at)}</p>
          <p className={style.orderNumber}>Заявка № - {order.order_number}</p>
          <p className={style.orderSum}>На сумму - {order.order_sum}₽</p>
        </div>
      ))}
    </div>
  );
}