import React from 'react';
import style from './page.module.scss';
import Image from 'next/image';


const PaymentMethodIndividual = () => {
  return (
    <div className={style.container}>
      <div className={style.paymentMethods}>
       
        <div className={style.methodDetails}>
        <div className={style.methodBlock}>
        <div className={style.iconTextBlock}>
              <img src='/icon/card.svg' alt="QRIcon" className={style.icon} />
              <h3 className={style.methodTitle}>Онлайн оплата</h3>
            </div>
            <p className={style.methodDescription}>
            Картами Visa, MasterCard, Мир. Без комиссии
            </p>
          </div>
          
          <div className={style.methodBlock}>
          <div className={style.iconTextBlock}>
              <img src='/icon/SBP.svg' alt="QRIcon" className={style.icon} />
              <h3 className={style.methodTitle}>По СПБ</h3>
            </div>
            <p className={style.methodDescription}>
              Платите через QR-код или ссылку. Вводить реквизиты карты не
              понадобится! Нужен только смартфон с приложением банка и интернетом
            </p>
          </div>

          <div className={style.methodBlock}>
            <div className={style.iconTextBlock}>
              <img src='/icon/qr_code_white_36dp.svg' alt="QRIcon" className={style.icon} />
              <h3 className={style.methodTitle}>По QR-коду</h3>
            </div>
            <p className={style.methodDescription}>
              Откройте приложение банка и выберите пункт с оплатой через QR-код. С
              помощью камеры распознайте QR-код и подтвердите оплату
            </p>
          </div>

          <div className={style.methodBlock}>
            <div className={style.iconTextBlock}>
              <img src='/icon/link_white_36dp.svg' alt="linkIcon" className={style.icon} />
              <h3 className={style.methodTitle}>По ссылке</h3>
            </div>
            <p className={style.methodDescription}>
              Перейдите по ссылке на оплату и выберите приложение вашего банка.
              Затем перейдите в него и подтвердите оплату
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodIndividual;
