'use client'
import React from 'react'
import style from './Profile.module.scss'
import { useGetMe, useResetForgotPasswordProfile } from '@/hook/userHook'

export default function Profile() {

    const {getMe,isLoading,error} = useGetMe()
    const {mutate,isSuccess,error:errorResetPassword} = useResetForgotPasswordProfile()

    if(isLoading){
        return(
            <div>Загрузка...</div>
        )
    }

    if(error){
        return(
            <div>Ошибка</div>
            )
    }

  return (
    <div className={`container ${style.profileContainer}`}>
        <div className={style.profileHeader}>
            <h2>Профиль пользователя</h2>
            <p>Управление информацией аккаунта</p>
        </div>
        <form>
            <div className={style.formGroup}>
                <label>Имя</label>
                <p>{getMe?.detail.username}</p>
            </div>
            <div className={style.formGroup}>
                <label >Логин</label>
                <p>{getMe?.detail.login}</p>
            </div>
            <div className={style.formGroup}>
                <label>Почта</label>
                <p>{getMe?.detail.email}</p>
            </div>
            <div className={style.formGroup}>
                <label>Номер телефона</label>
                <p>{getMe?.detail.phone}</p>
            </div>
            <div className={style.btnGroup}>
                <button type="button" className={style.reset} onClick={() => mutate(getMe?.detail.email as string)}> Сбросить пароль</button>
                <button type="button" className={style.reset}> Сменить почту</button>
            </div>
            {errorResetPassword && !isSuccess && (<p className={style.errorEmail}>{errorResetPassword.response?.data.detail}</p>)}
                {!errorResetPassword && isSuccess && (<p className={style.successEmail}>Пароль успешно сброшен! Новый пароль отправлен на ваш E-mail.</p>)}
        </form>
    </div>
  )
}
