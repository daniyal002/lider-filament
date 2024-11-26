"use client";

import { useRegistration } from "@/hook/useAuth";
import { IRegistrationRequest } from "@/interface/auth";
import Link from "next/link";
import React, { useEffect } from "react";
import { useHookFormMask } from "use-mask-input";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationRequest>({ mode: "onChange" });
  const { mutate, error,isSuccess } = useRegistration();
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
                    <input
                      type="text"
                      placeholder="Фамилия и Имя"
                      className="input"
                      maxLength={100}
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Имя обязательно",
                        },
                        pattern: {
                          value: /^[^@#<>\&=+\*№~^\$?!{}\[\]()%;:"\'|/\\,]*$/i,
                          message:
                            "Вы ввели запрещенные символы - @ # < > / & = + * № ~  ^ $ ? ! { } [ } ( ) % ; : \" ' | /",
                        },
                      })}
                    />
                    {errors.username && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.username.message}
                      </p>
                    )}

                    <input
                      type="text"
                      placeholder="Логин"
                      className="input"
                      maxLength={30}
                      {...register("login", {
                        required: {
                          value: true,
                          message: "Логин обязательно",
                        },
                        pattern: {
                          value: /^[^@#<>\&=+\*№~^\$?!{}\[\]()%;:"\'|/\\,]*$/i,
                          message:
                            "Вы ввели запрещенные символы - @ # < > / & = + * № ~  ^ $ ? ! { } [ } ( ) % ; : \" ' | /",
                        },
                      })}
                    />
                    {errors.login && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.login.message}
                      </p>
                    )}

                    <input
                      type="text"
                      placeholder="Ваш Email"
                      className="input"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email обязательно",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Неправильный Email",
                        },
                      })}
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.email.message}
                      </p>
                    )}

                    <input
                      type="tel"
                      placeholder="Ваш Телефон"
                      className="input"
                      inputMode="tel"
                      {...registerWithMask("phone", ["8(999)-999-99-99"])}
                    />

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
              {isSuccess && !error && (
                <div className="alert alert-success" role="alert">
                  <p>Вы успешно зарегистрировались! На вашу почту направлен пароль.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
