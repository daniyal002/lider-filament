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

  return (
    <header id="mt-header" className="style3">
      <div className="mt-top-bar">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 hidden-xs">
              <span className="tel active">
                <i className="fa fa-phone" aria-hidden="true"></i> +7 (964) 004
                48 53
              </span>
              <a className="tel" href="#">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>{" "}
                vagid08@mail.ru
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-bottom-bar">
        <div className="container-xl">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <Link className="navbar-brand" href="/">
              <Image
                src={logo}
                alt="Лидер-В"
                width={200}
                height={50}
                className="logo"
                // layout="responsive"
              />
            </Link>
            <div
              className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
              id="navbarNav"
              style={{ justifyContent: "center" }}
            >
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" href="/">
                    ГЛАВНАЯ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/product">
                    ПРОДУКТЫ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/about-company">
                    О КОМПАНИИ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/contact">
                    КОНТАКТЫ
                  </Link>
                </li>
              </ul>
            </div>
            {!isNavCollapsed && (
              <div className="threedHeader">
              <Link href="/feature">
                {pathname === "/feature" ? (
                  <i
                    className="bi bi-heart-fill"
                    style={{
                      fontSize: "25px",
                      color: "red",
                      fontWeight: "700",
                    }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-heart"
                    style={{
                      fontSize: "25px",
                      color: "#fff",
                      fontWeight: "700",
                    }}
                  ></i>
                )}
              </Link>
              <Link
                href="/cart"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-basket"
                  data-descr={cartLength}
                  style={{
                    fontSize: "28px",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                ></i>
                <div className="mt-sh-cart">
                  <strong>Корзина</strong>
                </div>
              </Link>
              {/* Add this */}
              {isNavCollapsed ? (
              <button
                className="navbar-toggler shadowH"
                type="button"
                aria-controls="navbarNav"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
                style={{color:"#fff"}}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            ) : (
              <button
                className="navbar-toggler shadowH"
                type="button"
                aria-label="Close menu"
                onClick={handleNavCollapse}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "0px",
                  border: "1px solid #6625a3",
                  background: "transparent",
                  color:"#fff"
                }}
              >
                <span className="bi bi-x" style={{fontSize:"20px", fontWeight:'bold'}}></span>
              </button>
            )}
            </div>
            ) }

            {isNavCollapsed && (
              <div className="secondHeader">
              <Link href="/feature">
                {pathname === "/feature" ? (
                  <i
                    className="bi bi-heart-fill"
                    style={{
                      fontSize: "25px",
                      color: "red",
                      fontWeight: "700",
                    }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-heart"
                    style={{
                      fontSize: "25px",
                      color: "#fff",
                      fontWeight: "700",
                    }}
                  ></i>
                )}
              </Link>
              <Link
                href="/cart"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-basket"
                  data-descr={cartLength}
                  style={{
                    fontSize: "28px",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                ></i>
                <div className="mt-sh-cart">
                  <strong style={{color:"#fff"}}>Корзина</strong>
                </div>
              </Link>
              {/* Add this */}
              {isNavCollapsed ? (
              <button
                className="navbar-toggler shadowH"
                type="button"
                aria-controls="navbarNav"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
                style={{color:"#fff",border: "1px solid #6625a3"}}

              >
                <span className="navbar-toggler-icon"></span>
              </button>
            ) : (
              <button
                className="navbar-toggler shadowH"
                type="button"
                aria-label="Close menu"
                onClick={handleNavCollapse}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "0px",
                  border: "1px solid rgba( 0,0,0 , 0.15",
                  background: "transparent",
                  color:"#6625a3"
                }}
              >
                <span className="bi bi-x" style={{fontSize:"20px", fontWeight:'bold'}}></span>
              </button>
            )}
            </div>
            )}

          </nav>
        </div>
      </div>
      <span className="mt-side-over"></span>
    </header>
  );
}
