import Link from 'next/link';
import React from 'react'
import style from './layout.module.scss'
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className='container' style={{padding:"0", margin:"0"}}>
      <nav className={style.navAdmin}>
        <ul className={style.listAdmin} style={{padding:0}}> 
            <li className={style.itemAdmin}>
                <Link href="/i/product" className={style.linkAdmin}>Товары</Link>
            </li>
            <li className={style.itemAdmin}>
                <Link href="/i/category" className={style.linkAdmin}>Категории</Link>
            </li>
            <li className={style.itemAdmin}>
                <Link href="/i/user" className={style.linkAdmin}>Пользователи</Link>
            </li>
            <li className={style.itemAdmin}>
                <Link href="/i/order" className={style.linkAdmin}>Заказы</Link>
            </li>
        </ul>
      </nav>
      {children}
      </div>
)
  }
