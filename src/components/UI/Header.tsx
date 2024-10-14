"use client";

import { decoder } from "@/helper/decoder";
import { useLogout } from "@/hook/useAuth";
import { getAccessToken } from "@/services/auth-token.service";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<boolean>();
  const { mutate: logout } = useLogout();
  const getToken = getAccessToken();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    const decodeToken = decoder(getToken);
    //@ts-ignore
    setUser(decodeToken.user);
  }, [getToken]);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
            {getToken ? (
              <div className="col-xs-12 col-sm-6 text-right">
                <ul className="mt-top-list">
                  <li>
                    <a href="#">Order Track</a>
                  </li>
                  {user ? (
                    <li>
                      <Link href={"/i"}>Аккаунт</Link>
                    </li>
                  ) : (
                    <li>
                      <Link href="/profile">Аккаунт</Link>
                    </li>
                  )}

                  <li className="active">
                    <a style={{ cursor: "pointer" }} onClick={() => logout()}>
                      Выход
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="col-xs-12 col-sm-6 text-right">
                <ul className="mt-top-list">
                  <li className={pathname === "/auth/login" ? "active" : ""}>
                    <Link href="/auth/login" style={{ cursor: "pointer" }}>
                      Вход
                    </Link>
                  </li>
                  <li
                    className={
                      pathname === "/auth/registration" ? "active" : ""
                    }
                  >
                    <Link
                      href="/auth/registration"
                      style={{ cursor: "pointer" }}
                    >
                      Регистрация
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-bottom-bar">
        <div className="container-xl">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" href="/">
              <Image
                loader={() => "/icon/logo.svg"}
                src="/icon/logo.svg"
                alt="schon"
                width={40}
                height={40}
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                      color: "#000",
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
                  style={{
                    fontSize: "28px",
                    color: "#000",
                    fontWeight: "700",
                  }}
                ></i>
                <div className="mt-sh-cart">
                  <strong>Корзина</strong>
                  <span>3 items &nbsp;$74.00</span>
                </div>
              </Link>
              {/* Add this */}
              {isNavCollapsed ? (
                <button
                  className="navbar-toggler"
                  type="button"
                  aria-controls="navbarNav"
                  aria-expanded={!isNavCollapsed ? true : false}
                  aria-label="Toggle navigation"
                  onClick={handleNavCollapse}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              ) : (
                <button
                  className="close-button"
                  type="button"
                  aria-label="Close menu"
                  onClick={handleNavCollapse}
                  style={{ position: "absolute", top: "10px", right: "10px",border:"1px solid rgba( 0,0,0 , 0.15", background:"transparent" }}
                >
                  <i
                    className="bi bi-x"
                    style={{ fontSize: "20px", color: "#000" }}
                  ></i>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
      <span className="mt-side-over"></span>
    </header>
  );
}
