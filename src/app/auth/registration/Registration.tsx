'use client'

import { useRegistration } from "@/hook/useAuth";
import { IRegistrationRequest } from "@/interface/auth";
import Link from "next/link";
import React, { useEffect } from "react";
import { useHookFormMask } from 'use-mask-input'
import { SubmitHandler, useForm } from "react-hook-form";

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegistrationRequest>({ mode: "onChange" });
  const { mutate, error } = useRegistration();
  const onSubmit: SubmitHandler<IRegistrationRequest> = (data) => mutate(data);
  const registerWithMask = useHookFormMask(register);


  return (
    <section className="mt-detail-sec toppadding-zero">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-push-1">
            <div className="holder">
              <div className="mt-side-widget">
                <header>
                  <h2>Регистрация</h2>
                  <p>У вас нет учетной записи?</p>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                    <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="text"
                        placeholder="Фамилия и Имя"
                        className="input"
                        maxLength={100}
                        {...register("username", {
                          required: { value: true, message: "Имя обязательно" },
                          pattern: {
                            value: /^[^@#<>\&=+\*№~^\$?!{}\[\]()%;:"\'|/\\,]*$/i,
                            message: "Вы ввели запрещенные символы - @ # < > / & = + * № ~  ^ $ ? ! { } [ } ( ) % ; : \"\ ' | /"
                          }
                        })}
                      />
                      {errors.username && <p style={{color:"#c93e3e", paddingLeft:"3px", marginBottom:'10px'}}>{errors.username.message}</p>}
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="text"
                        placeholder="Логин"
                        className="input"
                        maxLength={30}
                        {...register("login", {
                            required: { value: true, message: "Логин обязательно" },
                            pattern: {
                              value: /^[^@#<>\&=+\*№~^\$?!{}\[\]()%;:"\'|/\\,]*$/i,
                              message: "Вы ввели запрещенные символы - @ # < > / & = + * № ~  ^ $ ? ! { } [ } ( ) % ; : \"\ ' | /"
                            }
                          })}
                      />
                      {errors.login && <p style={{color:"#c93e3e", paddingLeft:"3px", marginBottom:'10px'}}>{errors.login.message}</p>}

                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="text"
                        placeholder="Ваш Email"
                        className="input"
                        {...register("email", {
                            required: { value: true, message: "Email обязательно" },
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Неправильный Email"
                            }
                          })}
                      />
                      {errors.email && <p style={{color:"#c93e3e", paddingLeft:"3px", marginBottom:'10px'}}>{errors.email.message}</p>}

                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="tel"
                        placeholder="Ваш Телефон"
                        className="input"
                        inputMode="tel"
                        {...registerWithMask("phone",['8(999)-999-99-99'])}
                      />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="password"
                        placeholder="Пароль"
                        className="input"
                        {...register("password", {
                            required: { value: true, message: "Пароль обязательно" },
                          })}
                      />
                      {errors.password && <p style={{color:"#c93e3e", paddingLeft:"3px", marginBottom:'10px'}}>{errors.password.message}</p>}

                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="password"
                        placeholder="Повторите Пароль"
                        className="input"
                        {...register("replayPassword", {
                            required: { value: true, message: "Повторить пароль обязательно" },
                            // @ts-ignore
                            validate:(value:string) => {if(watch('password') !== value ){return "Пароли не совпадают"}}
                          })}
                      />
                    </div>
                    </div>
                    <div className="box">
                      <Link href="/auth/login" className="help">
                        Вход
                      </Link>
                    </div>
                    <button type="submit" className="btn-type1">
                      Зарегистрироваться
                    </button>
                  </fieldset>
                </form>
              </div>
              {error && (
                <div className="alert alert-dark" role="alert">
                  {error.response?.data.detail}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
