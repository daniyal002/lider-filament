import PopularProducts from "@/components/PopularProducts/PopularProducts";
import style from "./page.module.scss";
import PopularCategory from "@/components/PopularCategory/PopularCategory";
import SubscribeUpdate from "@/components/SubscribeUpdate/SubscribeUpdate";
import Image from "next/image";
import banner from '../../public/img/banner-image.png'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <h1 className={style.title}>
            ООО «Лидер-В» - производитель филамента для 3D печати
          </h1>
          <p className={style.description}>
            ООО «Лидер-В» - это:
            <br /> -Современное оборудование и передовые технологии
            <br /> -Производственные мощности, позволяющие выпускать до 10 тонн
            готовой продукции в месяц.
            <br /> -Сертификаты соответствия -Двойной контроль, гарантирующий
            высокое качество нити.
            <br /> -Большой ассортимент выпускаемой продукции
            <br /> -Лучшие цены за нить высокого качества.
          </p>
          <div className={style.buttons}>
            <Link href="/product" className={`${style.button} ${style.getStarted}`}>
              Продукты
            </Link>
            <Link href="/about-company" className={`${style.button} ${style.createNtf}`}>
              О Компании
            </Link>
          </div>
        </div>
        <div className={style.image}>
          <Image src={banner} alt="Banner Image" width={500} height={500} />
        </div>
      </div>

      <div className={style.containerSecondScrenn}>
        <PopularProducts />
      </div>

      <div className={style.containerSecondScrenn}>
        <PopularCategory />
      </div>

      <div className={style.containerSecondScrenn}>
        <SubscribeUpdate />
      </div>
    </>
  );
}
