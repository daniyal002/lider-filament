"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from '/public/icon/logo.svg'
import "./Header.css";
import { useAtom } from "jotai";
import { lengthLocalCartAtom } from "@/store/cartStore";
import useLocalCart from "@/hook/localStorageCartHook";

export default function Header() {
  const pathname = usePathname();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [cartLength, setCartLength] = useAtom(lengthLocalCartAtom)
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const {getLocalCart} = useLocalCart()

  useEffect(()=>{
    setCartLength(getLocalCart().length)
  },[])

  
  const [scroll, setScroll] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);


  const handleScroll = () => {
  const scrollTop = window.scrollY;
  setScroll(scrollTop);
  setIsScrolled(scrollTop > 0);
};

  
  useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
<header id="mt-header" className="style3" style={{ marginBottom: "90px" }}>
  <div className="mt-top-bar">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 hidden-xs">
          <a className="tel active" href="tel:79289772357">
            <i className="fa fa-phone" aria-hidden="true"></i> +7 (928) 977 23 57
          </a>
          <a className="tel" href="mailto:vagid08@mail.ru">
            <i className="fa fa-envelope-o" aria-hidden="true"></i> vagid08@mail.ru
          </a>
        </div>
      </div>
    </div>
  </div>

  <div className={`mt-bottom-bar ${isScrolled ? "scrolled" : ""}`}>
    <div className="container-xl">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: "0 10px", flexWrap: "nowrap", position: "relative", zIndex: 100 }}>
        {/* Логотип */}
        <Link className="navbar-brand" href="/">
          <Image src={logo} alt="Лидер-В" width={200} height={50} className="logo" />
        </Link>

        {/* Меню (только для десктопа) */}
        <ul className="navbar-nav desktop-menu" style={{
         
          gap: '10px',
          margin: '0 auto',
        }}>
          <li className="nav-item">
            <Link className="nav-link" href="/">ГЛАВНАЯ</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/product">ТОВАРЫ</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/about-company">О КОМПАНИИ</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/contact">КОНТАКТЫ</Link>
          </li>
        </ul>

        {/* Иконки и бургер */}
        <div className="header-controls" style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
          <a href="https://wa.me/79289772357" target="_blank">
            <i className="fa fa-whatsapp" style={{ fontSize: "32px", color: "#2cb742" }}></i>
          </a>
          <Link href="/cart" style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center", alignItems: "center" }}>
            <i className="bi bi-basket" data-descr={cartLength} style={{ fontSize: "28px", color: "#fff", fontWeight: 700 }}></i>
            <div className="mt-sh-cart">
              <strong style={{ color: "#fff" }}>Корзина</strong>
            </div>
          </Link>
          <button
            className="navbar-toggler shadowH"
            type="button"
            onClick={handleNavCollapse}
            aria-label={isNavCollapsed ? "Открыть меню" : "Закрыть меню"}
            style={{ border: "1px solid #6625a3", background: "transparent", color: "#fff", position: "relative", zIndex: 1000 }}
          >
            {isNavCollapsed ? (
              <span className="navbar-toggler-icon"></span>
            ) : (
              <span className="bi bi-x" style={{ fontSize: "20px", fontWeight: "bold" }}></span>
            )}
          </button>
        </div>

        {/* Мобильное боковое меню */}
        <div
          className={`side-menu ${!isNavCollapsed ? "open" : ""}`}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "280px",
            height: "100vh",
            backgroundColor: "#551A8B",
            padding: "60px 20px",
            transition: "transform 0.3s ease-in-out",
            transform: isNavCollapsed ? "translateX(100%)" : "translateX(0)",
            zIndex: 999,
          }}
        >
          <ul className="navbar-nav" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <li className="nav-item">
              <Link className="nav-link" href="/" onClick={handleNavCollapse}>ГЛАВНАЯ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/product" onClick={handleNavCollapse}>ТОВАРЫ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about-company" onClick={handleNavCollapse}>О КОМПАНИИ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact" onClick={handleNavCollapse}>КОНТАКТЫ</Link>
            </li>
          </ul>
        </div>

        {/* Затемнение фона */}
        {!isNavCollapsed && (
          <div
            onClick={handleNavCollapse}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 998,
            }}
          />
        )}
      </nav>
    </div>
  </div>
</header>



  );
}
