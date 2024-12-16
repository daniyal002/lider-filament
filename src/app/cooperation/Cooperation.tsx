import React from 'react';
import style from './Cooperation.module.scss';

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
      <form className={style.form}>
        <div className={style.formInputs}>
          <input
            type="text"
            required
            placeholder="Ваше имя"
            className={style.input}
          />
          <input
            type="number"
            required
            placeholder="Ваш телефон"
            className={style.input}
          />
          <input
            type="email"
            placeholder="Ваш E-mail"
            className={style.input}
          />
        </div>
        <textarea
          rows={10}
          placeholder="Ваше сообщение"
          className={style.textarea}
        />
        <div className={style.formFooter}>
          <div className={style.checkboxContainer}>
            <input type="checkbox" required className={style.checkbox} style={{margin:"0"}}/>
            <span>Я согласен(а) на обработку персональных данных</span>
          </div>
          <button type="submit" className={style.submitButton}>
            Отправить
          </button>
        </div>
      </form>

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
