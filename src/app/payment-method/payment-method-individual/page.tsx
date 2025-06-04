import React from 'react';
import style from './page.module.scss';
import Image from 'next/image';
import card from '../../../../public/icon/card.svg'
import BackButton from '@/components/UI/BackButton';


const PaymentMethodIndividual = () => {
  return (
    <div className="container">
                        <BackButton />
      
      <div className={style.paymentMethods}>

        <div className={style.methodDetails}>
        <div className={style.methodBlock}>
        <div className={style.iconTextBlock}>
              <Image src={card} alt="icon" className={style.icon} width={36} height={36}/>
              <h3 className={style.methodTitle}>Онлайн оплата</h3>
            </div>
            <p className={style.methodDescription}>
            При оформлении на сайте или через онлайн-консультанта:банковсокой картой: Тинькофф, Сбербанк, Альфа-Банк, ВТБ-Банк и другие банки.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodIndividual;
