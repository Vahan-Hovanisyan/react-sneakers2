import styles from "./basket.module.css";
import { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import { Icon } from "../index";
import { useBasket } from "@/hooks/useBasket";

const Card = (props) => {
  const { title, price, img, productId, id } = props;
  const [loading, setLoading] = useState(false);
  const { removeProduct } = useBasket();

  const onClickRemove = () => {
    setLoading(true);
    removeProduct(id);
  };

  return (
    <div className={styles.cartItem} key={id}>
      <img className={styles.img} src={img} alt="Sneakers" />
      <div className={styles.cartContent}>
        <p className={styles.cartItemTitle}>{title}</p>
        <span className={styles.span}>{price} руб.</span>
      </div>
      <button
        disabled={loading}
        className={clsx(styles.buttonClose, loading && styles.loading)}
        onClick={onClickRemove}
      >
        <Icon className={styles.icon} id={"close"} />
      </button>
    </div>
  );
};

export default Card;
