import { useState } from "react";
import styles from "./Card.module.css";
import clsx from "clsx";
import {Icon} from "../index";
import { useFavorite } from "@/hooks/useFavorite";
import { useBasket } from "@/hooks/useBasket";
import { useLocation } from "react-router-dom";

 export function Card(props) {
  const [loading, setLoading] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const { addFavorite, isSomeFavorite, removeFavorite } = useFavorite();
  const { id, img, title, price } = props;
  const location = useLocation().pathname;
  const { addProduct, isSomeProduct} = useBasket();

  return (
    <article className={styles.item}>
      {location !== "/shop" &&
        <button
          className={clsx(
            styles.favoriteButton,
            loadingFavorite && styles.favoriteButtonLoading,
            isSomeFavorite(id) && styles.favoriteButtonActive
          )}
          onClick={() => {
            !isSomeFavorite(id) ? setLoadingFavorite(true) : setLoadingFavorite(false);
  
            location === "/favorite" ? 
              removeFavorite(id, true) : 
              addFavorite({ productId: id, img, title, price })}
          }
        >
          <Icon className={styles.favorite} id="favorite" />
        </button>
      }
      <img className={styles.img} src={img} alt="sneakers" />
      <h3 className={styles.itemTitle}>{title}</h3>
      <div className={styles.wrapper}>
        <span className={styles.span}>Цена:</span>
        <span className={styles.price}>{price} руб.</span>
      {location !== "/shop" &&
          <button
            className={clsx(
              styles.plusButton,
              loading && styles.plusButtonLoading,
              isSomeProduct(id) && styles.plusButtonActive
            )}
            onClick={() => {
              !isSomeProduct(id) ? setLoading(true) : setLoading(false);
              addProduct({
                productId: id,
                img,
                title,
                price,
              });
            }}
          >
            <Icon
              className={styles.plus}
              id={isSomeProduct(id) ? "checked" : "plus"}
            />
          </button>
        }
      </div>
    </article>
  );
}


