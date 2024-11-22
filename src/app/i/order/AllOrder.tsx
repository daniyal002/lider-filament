'use client'
import OrderDetail from '@/app/order/OrderDetail';
import { useAllOrdersData } from '@/hook/orderHook';
import React, { useState } from 'react'
import style from './AllOrder.module.scss'

export default function AllOrder() {
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
      const [openOrderId, setOpenOrderId] = useState<number>(NaN);

      const { allOrdersData } = useAllOrdersData();

      return (
        <div className={style.orderList}>
            {allOrdersData?.map((order) => (
                <React.Fragment key={order.order_number}>
                    {openOrderId !== order.order_id ? (
                        <div
                            className={style.orderListItem}
                            onClick={() => setOpenOrderId(order.order_id)}
                        >
                            <p className={style.orderDate}>
                                Дата создания заявки - {formattedDateTime(order?.created_at)}
                            </p>
                            <p className={style.orderNumber}>
                                Заявка № - {order?.order_number}
                            </p>
                            <p className={style.orderStatus}>
                                Статус - {order?.order_status?.order_status_name}
                            </p>
                            <p className={style.orderSum}>
                                На сумму - {order?.order_sum}₽
                            </p>
                        </div>
                    ) : (
                        <div>
                            <OrderDetail order={order} />
                            <button onClick={() => setOpenOrderId(NaN)}>Закрыть детали</button>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
