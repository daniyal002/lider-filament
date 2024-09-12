import React from 'react';
import style from './page.module.scss';

const PaymentMethodBusiness = () => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Оплата счета</h2>
      <p className={style.description}>
        Срок оплаты выставленного менеджером счета – до 3 дней. В некоторых
        случаях по согласованию с менеджером его можно продлить. Мы отгрузим
        товар в течение суток после поступления денежных средств на наш счет.
      </p>
    </div>
  );
};

export default PaymentMethodBusiness;
