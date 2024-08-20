"use client";

import { useLogin } from "@/hook/useAuth";
import { ILoginRequest } from "@/interface/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({ mode: "onChange" });
  const { mutate, error } = useLogin();
  const onSubmit: SubmitHandler<ILoginRequest> = (data) => mutate(data);

  return (
    <section className="mt-detail-sec toppadding-zero">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-push-2">
            <div className="holder">
              <div className="mt-side-widget">
                <header>
                  <h2>Вход</h2>
                  <p>Добро пожаловать обратно! Войдите в свой аккаунт</p>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                    <input
                      type="text"
                      placeholder="Логин или E-mail"
                      className="input"
                      {...register("login", {
                        required: {
                          value: true,
                          message: "Логин или E-mail обязательно",
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
                      type="password"
                      placeholder="Пароль"
                      className="input"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Пароль обязательно",
                        },
                      })}
                    />
                    {errors.password && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.password.message}
                      </p>
                    )}
                    <div className="box">
                      <span className="left">
                        <input
                          className="checkbox"
                          type="checkbox"
                          id="check1"
                        />
                        <label>Remember Me</label>
                      </span>
                      <Link href="/auth/registration" className="help">
                        Регистрация
                      </Link>
                    </div>
                    <button type="submit" className="btn-type1">
                      Войти
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
