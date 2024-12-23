'use client'
import React from "react";
import style from "./CooperationForm.module.scss";
import { IContactForm } from "@/interface/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendTelegramMessageFromContact } from "@/helper/telegram";
import { Toaster } from "react-hot-toast";

export default function CooperationForm() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<IContactForm>();

  const onSumbit: SubmitHandler<IContactForm> = (data) => {
    sendTelegramMessageFromContact(
      data.name,
      data.phone,
      data.email,
      data.messageText,
      "Сотрудничество"
    );
    reset({ email: "", isAgreed: false, messageText: "", name: "", phone: "" });
  };
  return (
    <form className={style.form} onSubmit={handleSubmit(onSumbit)}>
        <Toaster/>
      <div className={style.formInputs}>
        <input
          type="text"
          required
          placeholder="Ваше имя"
          {...register("name")}
          className={style.input}
        />
        <input
          type="number"
          required
          placeholder="Ваш телефон"
          {...register("phone")}
          className={style.input}
        />
        <input
          type="email"
          placeholder="Ваш E-mail"
          {...register("email")}
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
          <input
            type="checkbox"
            required
            className={style.checkbox}
            style={{ margin: "0" }}
          />
          <span>Я согласен(а) на обработку персональных данных</span>
        </div>
        <button type="submit" className={style.submitButton}>
          Отправить
        </button>
      </div>
    </form>
  );
}
