import React from 'react'
import style from './Share.module.scss'
import ShareItem from './ShareItem';

export default function Share() {
    return (
        <div className={style.container}>
          <h1 className={style.title}>Акции</h1>
          <p className={style.description}>
            Акции не суммируются.
            <br /> При одном заказе действует только одна Акция на выбор!
          </p>
    
          <div className={style.promoContainer}>
          <ShareItem />
          <ShareItem />
          <ShareItem />
          <ShareItem />
          </div>
        </div>
      );
}
