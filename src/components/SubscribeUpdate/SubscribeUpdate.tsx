import React from "react";
import styles from "./SubscribeUpdate.module.scss";

export default function SubscribeUpdate(){
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="./img/single-image.jpg" alt="" className={styles.image} />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Подпишитесь и получайте свежие новости о нитях для 3D принтеров.
        </h1>
        <p className={styles.description}>
          Приобретайте высококачественные нити прямо сейчас. Наши нити
          обеспечивают надежную подачу материала и идеальное качество печати. В
          нашем ассортименте вы найдете разнообразие цветов и типов нитей, чтобы
          воплотить в жизнь все ваши творческие идеи.
        </p>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Введите Е-mail"
            className={styles.input}
          />
          <button className={styles.button}>Подписаться</button>
        </form>
      </div>
    </div>
  );
};
