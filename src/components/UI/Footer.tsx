import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer id="mt-footer" className="style8 wow fadeInUp" data-wow-delay="0.4s">
				<div className="footer-holder dark">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-12 col-sm-4">
								<div className="f-widget-about">
									<div className="logo">
										<Link href="/"><img src="/icon/logo.svg" alt="Lider-V"/></Link>
									</div>
									<ul className="list-unstyled address-list">
										<li><address>Connaugt Road Central Suite 18B, 148 <br/>New Yankee</address></li>
										<li><a href="tel:15553332211">+1 (555) 333 22 11</a></li>
										<li><a href="mailto:&#105;&#110;&#102;&#111;&#064;&#115;&#099;&#104;&#111;&#110;&#046;&#099;&#104;&#097;&#105;&#114;">&#105;&#110;&#102;&#111;&#064;&#115;&#099;&#104;&#111;&#110;&#046;&#099;&#104;&#097;&#105;&#114;</a></li>
									</ul>
									<ul className="list-unstyled social-network">
										<li><a href="#"><i className="bi bi-telegram" style={{fontSize:"19px"}}></i></a></li>
										<li><a href="#"><i className="fa fa-whatsapp" style={{fontSize:"19px"}}></i></a></li>
									</ul>
								</div>
							</div>
							<nav className="col-xs-12 col-sm-8">
								<div className="nav-widget-1">
									<h3 className="f-widget-heading">Маркетплейс</h3>
									<ul className="list-unstyled f-widget-nav">
										<li><Link href="/product">Продукты</Link></li>
										<li><a href="#">Категории</a></li>
									</ul>
								</div>
								<div className="nav-widget-1">
									<h3 className="f-widget-heading">Информация</h3>
									<ul className="list-unstyled f-widget-nav">
										<li><Link href="/share">Акции</Link></li>
										<li><Link href="/cooperation">Сотрудничество</Link></li>
										<li><Link href="/payment-info/order-description">Информация об оплате</Link></li>
										<li><Link href="/payment-info/return-description">Информация о возврате</Link></li>
										<li><Link href="/payment-method/payment-method-individual">Методы оплаты для физ. лиц</Link></li>
										<li><Link href="/payment-method/payment-method-business">Методы оплаты для юр. лиц</Link></li>
									</ul>
								</div>
								<div className="nav-widget-1">
									<h3 className="f-widget-heading">Компания</h3>
									<ul className="list-unstyled f-widget-nav">
										<li><Link href="/about-company">О компании</Link></li>
										<li><Link href="/contact">Контакты</Link></li>
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
								<p>© <Link href="/">Лидер-В</Link> - все права защищены</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
  )
}
