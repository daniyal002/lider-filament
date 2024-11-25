"use client";

import { useResetForgotPassword } from "@/hook/userHook";
import { SubmitHandler, useForm } from "react-hook-form";
import style from './ResetPassword.module.scss'
import Link from "next/link";
export default function RessetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{email:string}>({ mode: "onChange" });
  const { mutate, error,isSuccess } = useResetForgotPassword();
  const onSubmit: SubmitHandler<{email:string}> = (data) => mutate(data.email);

  return (
    <section className="mt-detail-sec toppadding-zero">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-push-2">
            <div className="holder">
              <div className="mt-side-widget">
                <header>
                  <h2>Сброс пароля</h2>
                  <p>Для сброса пароля введите корректный E-mail, на ваш E-mail придет новый пароль</p>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>

                  <input
                  type="email"
                  className="input"
                  placeholder="E-mail"
                  {...register("email", {
                    required: {message:"Обязательно Email",value:true},
                    pattern: {message:"Введите корректно Email", value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
                  })}
                />
                 <div className="box">
                 <span className="left">
                <Link href='/auth/login' className="help">Вход</Link>
                </span>
                <Link href='/auth/registration' className="help">Регистрация</Link>
                </div>
                {errors && (<p className={style.errorEmail}>{errors.email?.message}</p>)}
                {!errors.email?.message && error && (<p className={style.errorEmail}>{error.response?.data.detail}</p>)}
                {isSuccess && (<p className={style.successEmail}>Пароль успешно сброшен! Новый пароль отправлен на ваш E-mail.</p>)}
                    <button type="submit" className="btn-type1">
                      Сбросить пароль
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
