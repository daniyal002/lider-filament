'use client'

import { useRegistration } from "@/hook/useAuth";
import { IRegistrationRequest } from "@/interface/auth";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationRequest>({ mode: "onChange" });
  const { mutate, error } = useRegistration();
  const onSubmit: SubmitHandler<IRegistrationRequest> = (data) => mutate(data);

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
                        {...register("username", {
                          required: { value: true, message: "Имя обязательно" },
                        })}
                      />
                      {errors.username && <p style={{color:"#c93e3e", paddingLeft:"3px", marginBottom:'10px'}}>{errors.username.message}</p>}
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="text"
                        placeholder="Логин"
                        className="input"
                        {...register("login", {
                            required: { value: true, message: "Логин обязательно" },
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
                          })}
                      />
                      {errors.email && <p style={{color:"#c93e3e", paddingLeft:"3px", marginBottom:'10px'}}>{errors.email.message}</p>}

                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <input
                        type="tel"
                        placeholder="Ваш Телефон"
                        className="input"
                        {...register("phone")}
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
