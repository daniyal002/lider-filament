import React from 'react';
import style from './page.module.scss';

const PaymentMethodBusiness = () => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Оплата счета</h2>
      <p className={style.description}>
       Безналичный расчет: для индувидуальных предпринимателей и юридических лиц.
      </p>
    </div>
  );
};

export default PaymentMethodBusiness;
