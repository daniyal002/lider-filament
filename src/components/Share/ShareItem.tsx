import React from 'react'
import style from './ShareItem.module.scss'


export default function ShareItem() {
    return (
        <div className={style.promoContainer}>
          <div className={style.promoContent}>
            <div className={style.promoDetails}>
              <img
                src="./img/Stocks.jpg"
                alt="Promo"
                className={style.promoImage}
              />
              <div className={style.promoText}>
                <p className={style.promoTitle}>
                  Скидка 5% при покупке 5-ти товаров
                </p>
                <a href="#" className={style.promoLink}>
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      );
}
