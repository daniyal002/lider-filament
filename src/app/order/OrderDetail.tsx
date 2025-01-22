import { IOrderResponseDeatail } from '@/interface/order';
import React from 'react';
import style from './OrderDetail.module.scss';

interface Props {
    order: IOrderResponseDeatail;
}

export default function OrderDetail({ order }: Props) {
    return (
        <div className={style.orderDetail}>
            <h1 className={style.orderNumber}>Заказ №{order.order_number}</h1>
            <p className={style.orderDate}>Дата создания: {new Date(order.created_at).toLocaleString()}</p>
            <p className={style.orderStatus}>Статус: {order?.order_status?.order_status_name}</p>
            <p className={style.orderSum}>Сумма заказа: {order?.order_sum}₽</p>

            <h2 className={style.productsTitle}>Товары в заказе:</h2>
            <div className={style.productsList}>
                {order?.order_products?.map((product, index) => (
                    <div className={style.productItem} key={index}>
                        <h3 className={style.productName}>{product.product_name}</h3>
                        <p>Количество: {product.product_quantity}</p>
                        <p>Цена: {product.product_price}₽/кг</p>
                        <p>Сумма: {product.product_sum}₽</p>
                    </div>
                ))}
            </div>
        </div>
    );
}