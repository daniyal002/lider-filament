import React from 'react';
import style from './Cooperation.module.scss';
import CooperationForm from '@/components/CooperationForm/CooperationForm';

const Cooperation = () => {
  return (
    <div className={style.container}>
      <FirstCooperationScreen />
      <FormCooperation />
    </div>
  );
};

const FirstCooperationScreen = () => {
  return (
    <div className={style.firstScreen}>
      <h1 className={style.mainTitle}>Сотрудничество</h1>
      <h2 className={style.subtitle}>Оптовикам</h2>
      <p className={style.description}>
      На нашем сайте Вы можете купить все представленные виды нити для 3D печати крупным и мелким оптом по низким ценам.
      </p>
    </div>
  );
};

const FormCooperation = () => {
  return (
    <div className={style.formContainer}>
      <h3 className={style.formTitle}>
        Для получения прайс-листа и дополнительной информации, заполните форму
        обратной связи:
      </h3>
      <CooperationForm/>

      <div className={style.infoBlock}>
        <p className={style.phoneInfo}>
          Или получите больше информации по всем вопросам и оптовому прайс-листу
          у наших менеджеров по телефону
          <a href="tel:89289772357" className={style.phoneLink}>
            8-928-977-23-57
          </a>
        </p>
      </div>
    </div>
  );
};

export default Cooperation;
