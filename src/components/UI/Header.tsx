'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Header() {
    const path = usePathname() 
  return (
    <header id="mt-header" className="style3">
    <div className="mt-top-bar">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 hidden-xs">
                    <span className="tel active"> <i className="fa fa-phone" aria-hidden="true"></i> +1 (555) 333 22 11</span>
                    <a className="tel" href="#"> <i className="fa fa-envelope-o" aria-hidden="true"></i> info@schon.chairs</a>
                </div>
                <div className="col-xs-12 col-sm-6 text-right">
                    <ul className="mt-top-list">
                        <li><a href="#">Order Track</a></li>
                        <li><a href="#">My Account</a></li>
                        <li className="active"><a href="#">Checkout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className="mt-bottom-bar">
        <div className="container">
            <div className="row">
                <div className="col-xs-12" style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap:"50px"
                }}>
                    <div className="mt-logo"><a href="#"><Image loader={() => '/icon/logo.svg'} src="/icon/logo.svg" alt="schon" width={40} height={40}/></a></div>
                    
                    <nav id="nav">
                        <ul style={{
                             display: "flex",
                             gap:"15px"
                        }}>
                            <li style={{margin:"0"}}>
                                <Link className="drop-link" href="/">ГЛАВНАЯ</Link>
                            </li>
                            <li className="drop-link" style={{margin:"0"}}>
                                <Link href="/product">ПРОДУКТЫ</Link>
                            </li>
                            <li style={{margin:"0"}}><Link href="/about-company">О КОМПАНИИ</Link></li>
                           
                            <li style={{margin:"0"}}><Link href="/about-company">КОНТАКТЫ</Link></li>
                        </ul>
                    </nav>
                    
                    <div style={{display:'flex', alignItems:'center',gap:"10px"}}>
                        <Link href="/feature">{path === "/feature" ? (<i className="bi bi-heart-fill" style={{fontSize:"25px", color:"red", fontWeight:"700"}}></i>) : (<i className="bi bi-heart" style={{fontSize:"25px", color:"#000", fontWeight:"700"}}></i>)}</Link>
                    <div className="mt-sh-cart">
                        <span className="icon-handbag"></span>
                        <strong>Корзина</strong>
                        <span>3 items &nbsp;$74.00</span>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <span className="mt-side-over"></span>
</header>
  )
}
