import React from "react";
import style from "./Contact.module.scss";
import Link from "next/link";
import email from "/public/icon/email_white_36dp.svg";
import phone from "/public/icon/phone.svg";
import home from "/public/icon/home_white_36dp.svg";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { IContactForm } from "@/interface/user";
import { sendTelegramMessageFromContact } from "@/helper/telegram";
import ContactForm from "@/components/ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className={style.container}>
      <div className={style.contactHeader}>
        <h1 className={style.title}>Контакты</h1>
        <div className={style.contactBlocks}>
          <ContactBlock img={phone} type="tel" text="+7 (928) 977-23-57" />
          <ContactBlock img={email} type="mailto" text="vagid08@mail.ru" />
          <ContactBlock
            img={home}
            text="Город Махачкала, пр-кт Насрутдинова 107А"
          />
        </div>
      </div>

      <div className={style.contactForm}>
        <ContactForm />
      </div>
    </div>
  );
};

const ContactBlock = ({
  img,
  text,
  type,
}: {
  img: string;
  text: string;
  type?: "tel" | "mailto" | undefined;
}) => {
  return (
    <>
      {type ? (
        <Link href={`${type}:${text}`} className={style.contactBlockLink}>
          <div className={style.contactBlock}>
            <Image
              src={img}
              alt="icon"
              className={style.icon}
              width={60}
              height={36}
            />
            <p className={style.text}>{text}</p>
          </div>
        </Link>
      ) : (
        <Link href="#" className={style.contactBlockLink}>
          <div className={style.contactBlock}>
            <Image
              src={img}
              alt="icon"
              className={style.icon}
              width={60}
              height={36}
            />
            <p className={style.text}>{text}</p>
          </div>
        </Link>
      )}
    </>
  );
};

;

export default Contact;
