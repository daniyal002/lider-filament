import React from "react";
import style from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={style.container}>
      <div className={style.contactHeader}>
        <h1 className={style.title}>Контакты</h1>
        <div className={style.contactBlocks}>
          <ContactBlock
            img={"/icon/phone.svg"}
            headerText="Телефон для звонков"
            text="+7 (964) 004-48-53"
          />
          <ContactBlock
            img={"/icon/email_white_36dp.svg"}
            headerText="Почта для связи"
            text="vagid08@mail.ru"
          />
          <ContactBlock
            img={"/icon/home_white_36dp.svg"}
            headerText="Адрес"
            text="Город Махачкала, пр-кт Насрутдинова 107А"
          />
        </div>
      </div>

      <div className={style.contactForm}>
        <ContactForm />
      </div>
    </div>
  );
};

const ContactBlock = ({ img, headerText, text }:{img:string,headerText:string,text:string}) => {
  return (
    <div className={style.contactBlock}>
      <img src={img} alt="icon" className={style.icon} />
      <p className={style.text}>{text}</p>
    </div>
  );
};

const ContactForm = () => {
  return (
    <div className={style.formContainer}>
      <h2 className={style.title}>Обратная связь</h2>
      <form className={style.form}>
        <div className={style.formGroup}>
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
        <div className={style.textareaContainer}>
          <textarea
            rows={10}
            placeholder="Ваше сообщение"
            className={style.textarea}
          />
        </div>
        <div className={style.formFooter}>
          <label className={style.checkboxLabel}>
            <input type="checkbox" required className={style.checkbox} style={{margin:'0'}}/>
            Я согласен(а) на обработку персональных данных
          </label>
          <button type="submit" className={style.submitButton}>
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
