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
        В нашем интернет-магазине, Вы можете купить пластик оптом от
        производителя по выгодной цене. Наш оптовый отдел рад предложить Вам
        крупный и мелкий опт, товары по максимально низким оптовым ценам.
        Приобрести оптом можно все виды пластиков, размещенные в прайс листе.
        Так же мы отправляем пластик оптом в другие страны.
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
          у наших менеджеров по телефону{' '}
          <a href="tel:89178321942" className={style.phoneLink}>
            8-917-832-19-42
          </a>
        </p>
        <button className={style.priceListButton}>Скачать прайс-лист</button>
      </div>
    </div>
  );
};

export default Cooperation;
