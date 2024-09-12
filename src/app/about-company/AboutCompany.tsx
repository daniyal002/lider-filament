import React from "react";
import style from "./AboutCompany.module.scss";
import { IPaymentTable } from "@/interface/payment";

const AboutCompany = () => {
  const listPaymentToIndividuals:IPaymentTable[] = [
    {
      description: "Полное наименование организации",
      text: "Индивидуальный Предприниматель Прикащиков Алексей Анатольевич",
    },
    {
      description: "ИНН",
      text: "344199282349",
    },
    {
      description: "ОГРН",
      text: "309345927800088",
    },
    {
      description: "Фактический адрес",
      text: "400127, г. Волгоград, ул. Студеная 11, стр 1",
    },
    {
      description: "Юридический адрес",
      text: "г. Волгоград, ул. Ополченская 46-44",
    },
    {
      description: "Наименование банка",
      text: "Филиал Южный ПАО Банка «ФК Открытие» г. Волгоград",
    },
    {
      description: "БИК",
      text: "046015061",
    },
    {
      description: "Расчетный счёт",
      text: "40802810617250001646",
    },
    {
      description: "Кор. счёт",
      text: "30101810560150000061",
    },
  ];

  const listPaymentToLegalEntities:IPaymentTable[] = [
    {
      description: "Полное наименование организации",
      text: "Общество с ограниченной ответственностью 'ПК 'НИТ' ",
    },
    {
      description: "ИНН",
      text: "3459072358",
    },
    {
      description: "КПП",
      text: "345901001",
    },
    {
      description: "ОГРН",
      text: "1173443004701",
    },
    {
      description: "Фактический адрес",
      text: "Волгоград, Университетский проспект, Волгоград, ул. Новороссийская, д.5, кв.254",
    },
    {
      description: "Юридический адрес",
      text: "400127, Россия, Волгоградская область, г. Волгоград, ул. Студеная, дом 11, офис 1",
    },
    {
      description: "Наименование банка",
      text: "ФИЛИАЛ ТОЧКА БАНК КИВИ БАНК (АО)",
    },
    {
      description: "БИК",
      text: "044525797",
    },
    {
      description: "Расчетный счёт",
      text: "40702810610050008030",
    },
    {
      description: "Кор. счёт",
      text: "30101810445250000797",
    },
  ];

  return (
    <div className={style.container}>
      <h1 className={style.header}>О компании</h1>
      <img src="./img/banner-lg1.jpg" alt="banner" className={style.banner} />

      <div className={style.promoSection}>
        <FirstPromotioItem />
        <SecondPromotioItem />
        {/* <ThirdPromotioItem /> */}
        {/* <FourthPromotioItem /> */}
      </div>

      <div className={style.requisitesSection}>
        <RequisitesPromotioTable list={listPaymentToIndividuals} text="Оплата физическим лицам" />
        <RequisitesPromotioTable list={listPaymentToLegalEntities} text="Оплата юридическим лицам" />
      </div>
    </div>
  );
};

const FirstPromotioItem = () => (
  <div className={style.promoItem}>
    <h2>Почему стоит доверять Нам</h2>
    <p>Для изготовления промышленных композитов — мы используем собственную методику получения полимерных композиций с регулируемым уровнем показателей для 3Д печати FDM.</p>
    <a href="#" className={style.link}>Сертификаты</a>
  </div>
);

const SecondPromotioItem = () => (
  <div className={style.promoItem}>
    <h2>ООО «Лидер-В» - это:</h2>
    <p>Производственные мощности, позволяющие выпускать до 10тонн готовой продукции в месяц</p>
    <ul>
      <li><span>✓</span> Современное оборудование</li>
      <li><span>✓</span> Сертификаты соответствия</li>
      <li><span>✓</span> Большой ассортимент</li>
      <li><span>✓</span> Лучшие цены</li>
    </ul>
  </div>
);



const RequisitesPromotioTable = ({ list, text }:{list:IPaymentTable[], text:string}) => (
  <div className={style.requisites}>
    <h2>{text}</h2>
    <table className={style.requisitesTable}>
      <tbody>
        {list.map((item) => (
          <tr key={item.text}>
            <td>{item.description}</td>
            <td>{item.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AboutCompany;
