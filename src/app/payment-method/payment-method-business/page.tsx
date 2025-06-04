import React from 'react';
import style from './page.module.scss';
import BackButton from '@/components/UI/BackButton';

const PaymentMethodBusiness = () => {
  return (
    <div className="container">
                        <BackButton />
      
      <h2 className={style.title}>Оплата счета</h2>
      <p className={style.description}>
       Безналичный расчет: для индувидуальных предпринимателей и юридических лиц.
      </p>
    </div>
  );
};

export default PaymentMethodBusiness;
