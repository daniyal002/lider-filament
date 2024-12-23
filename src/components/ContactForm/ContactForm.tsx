'use client'
import { IContactForm } from '@/interface/user';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './ContactForm.module.scss'
import { sendTelegramMessageFromContact } from '@/helper/telegram';
import { Toaster } from 'react-hot-toast';

export default function ContactForm() {
    const { register, handleSubmit,formState:{errors},reset } = useForm<IContactForm>();

    const onSumbit: SubmitHandler<IContactForm>  = (data) => {
      sendTelegramMessageFromContact(data.name,data.phone,data.email,data.messageText, "Контакты")
      reset({email:'',isAgreed:false,messageText:'',name:'',phone:''})
    }
    return (
      <div className={style.formContainer}>
        <h2 className={style.title}>Обратная связь</h2>
        <Toaster toastOptions={{duration:5000}} />
        <form className={style.form} onSubmit={handleSubmit(onSumbit)}>
          <div className={style.formGroup}>
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
          <div className={style.textareaContainer}>
            <textarea
              rows={10}
              placeholder="Ваше сообщение"
              {...register("messageText")}
              className={style.textarea}
            />
          </div>
          <div className={style.formFooter}>
            <div className={style.formFooterCheckboxAndError}>
            <label className={style.checkboxLabel}>
              <input
                type="checkbox"
                className={style.checkbox}
                style={{ margin: "0" }}
                {...register("isAgreed", {
                  required: {
                    value: true,
                    message:
                      "Прежде чем отправить сообщение нужно согласиться на обработку персональных данных",
                  },
                })}
              />
              Я согласен(а) на обработку персональных данных
            </label>
              {errors.isAgreed && (<p>{errors.isAgreed?.message}</p>)}
            </div>
            <button type="submit" className={style.submitButton}>
              Отправить
            </button>
          </div>
        </form>
      </div>
    );
}
