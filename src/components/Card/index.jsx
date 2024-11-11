import { useState, useCallback, useEffect } from "react";
import styles from "./Card.module.css";
import clsx from "clsx";
import { Icon } from "../index";
import { useFavorite } from "@/hooks/useFavorite";
import { useBasket } from "@/hooks/useBasket";
import { useLocation } from "react-router-dom";
import debounce from "lodash.debounce";

export function Card(props) {
  const [loading, setLoading] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const { addFavorite, isSomeFavorite, removeFavorite } = useFavorite();
  const { id, img, title, price } = props;
  const location = useLocation().pathname;
  const { addProduct, isSomeProduct, removeProduct } = useBasket();

  useEffect(() => {
    setLoading(false);
    setLoadingFavorite(false);
  }, [isSomeProduct(id), isSomeFavorite(id)]);

  const onClickToBasketProduct = useCallback(async () => {
    await addProduct({ productId: id, img, title, price });
    setLoading(false);
  }, [addProduct]);

  const onClickToFavoriteProduct = useCallback(async () => {
    await addFavorite({ productId: id, img, title, price });
    setLoadingFavorite(false);
  }, []);

  return (
    <article className={styles.item}>
      {location !== "/shop" && (
        <button
          disabled={loadingFavorite}
          className={clsx(
            styles.favoriteButton,
            loadingFavorite && styles.favoriteButtonLoading,
            (isSomeFavorite(id) || location === "/favorite") &&
              styles.favoriteButtonActive,
          )}
          onClick={() => {
            setLoadingFavorite(true);
            location === "/favorite"
              ? removeFavorite(id)
              : !isSomeFavorite(id) && onClickToFavoriteProduct();
          }}
        >
          <Icon className={styles.favorite} id="favorite" />
        </button>
      )}
      <img className={styles.img} src={img} alt="sneakers" />
      <h3 className={styles.itemTitle}>{title}</h3>
      <div className={styles.wrapper}>
        <span className={styles.span}>Цена:</span>
        <span className={styles.price}>{price} руб.</span>
        {location !== "/shop" && (
          <button
            disabled={loading}
            className={clsx(
              styles.plusButton,
              loading && styles.plusButtonLoading,
              isSomeProduct(id) && styles.plusButtonActive,
            )}
            onClick={() => {
              setLoading(true);
              !isSomeProduct(id) && onClickToBasketProduct();
            }}
          >
            <Icon
              className={styles.plus}
              id={isSomeProduct(id) ? "checked" : "plus"}
            />
          </button>
        )}
      </div>
    </article>
  );
}
