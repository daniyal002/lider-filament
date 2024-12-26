import Link from "next/link";
import React from "react";
import logo from "/public/icon/logo.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="mt-footer"
      className="style8 wow fadeInUp"
      data-wow-delay="0.4s"
    >
      <div className="footer-holder dark">
        <div className="container-fluid">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-xs-12 col-sm-4">
              <div className="f-widget-about">
                <div className="logo">
                  <Link href="/">
                    <Image src={logo} alt="Lider-V" width={100} height={100} />
                  </Link>
                  {/* <Link href="/"><img src={logo} alt="Lider-V" /></Link> */}
                </div>
                <ul className="list-unstyled address-list">
                  <li>
                    <address style={{ width: "100%", maxWidth: "320px",display:'flex',flexDirection:"column",rowGap:"5px" }}>
                      <span>
                        Производитель «ООО Лидер-В» Адрес г.Махачкала
                        ул.Наструдинова дом 107А. кв 37
                      </span>
                      <span>
                        Сертификат соответствия N РОСС RU A32425 04ФИКО Н00321 с
                        13.05.24 по 12.05.27
                      </span>
                    </address>
                  </li>
                  <li>
                    <a href="tel:79640044853">+7 (964) 004 48 53</a>
                  </li>
                  <li>
                    <a href="mail:vagid08@mail.ru">vagid08@mail.ru</a>
                  </li>
                </ul>
                <ul className="list-unstyled social-network">
                  <li>
                    <a href="#">
                      <i
                        className="bi bi-telegram"
                        style={{ fontSize: "19px" }}
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/79289772357" target="_blank">
                      <i
                        className="fa fa-whatsapp"
                        style={{ fontSize: "19px" }}
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <nav className="col-xs-12 col-sm-8">
              <div className="nav-widget-1">
                <h3 className="f-widget-heading">Маркетплейс</h3>
                <ul className="list-unstyled f-widget-nav">
                  <li>
                    <Link href="/product">Продукты</Link>
                  </li>
                </ul>
              </div>
              <div className="nav-widget-1">
                <h3 className="f-widget-heading">Информация</h3>
                <ul className="list-unstyled f-widget-nav">
                  {/* <li><Link href="/share">Акции</Link></li> */}
                  <li>
                    <Link href="/cooperation">Сотрудничество</Link>
                  </li>
                  <li>
                    <Link href="/payment-info/order-description">
                      Информация об оплате
                    </Link>
                  </li>
                  <li>
                    <Link href="/payment-info/return-description">
                      Информация о возврате
                    </Link>
                  </li>
                  <li>
                    <Link href="/payment-method/payment-method-individual">
                      Методы оплаты для физ. лиц
                    </Link>
                  </li>
                  <li>
                    <Link href="/payment-method/payment-method-business">
                      Методы оплаты для юр. лиц
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="nav-widget-1">
                <h3 className="f-widget-heading">Компания</h3>
                <ul className="list-unstyled f-widget-nav">
                  <li>
                    <Link href="/about-company">О компании</Link>
                  </li>
                  <li>
                    <Link href="/contact">Контакты</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="footer-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 text-center">
              <p>
                © <Link href="/">Лидер-В</Link> - все права защищены
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
