import styles from "./basket.module.css";
import { Icon, Empty } from "../index";
import { useState, useCallback, useEffect } from "react";
import { useBasket } from "@/hooks/useBasket";
import { useShop } from "@/hooks/useShop";
import { isShowBasket } from "@/store/basket";
import clsx from "clsx";
import Card from "./Card";

export const Basket = () => {
  const [isBuy, setIsBuy] = useState(false);
  const {
    basket,
    removeProduct,
    total,
    totalPrice,
    isSomeProduct,
    isFindProduct,
  } = useBasket();
  const { addShop, shopProductsLength } = useShop();
  const { setIsShow, isShow } = isShowBasket();

  const onClickBuy = async () => {
    setIsBuy(true);
    await addShop(basket);
  };

  useEffect(() => {
    return () => setIsBuy(false);
  }, [isShow]);

  return (
    <>
      {isShow && (
        <>
          <div className={styles.overlay} onClick={setIsShow}></div>
          <div className={styles.aside}>
            <h2 className={styles.title}>Корзина</h2>
            <button className={styles.close} onClick={setIsShow}>
              <Icon className={styles.icon} id={"close"} />
            </button>
            {basket.length > 0 ? (
              <>
                <div className={styles.cartWrapper}>
                  {basket.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                  <div className={styles.items}>
                    <ul className={styles.itemsList}>
                      <li className={styles.itemsProps}>
                        <p className={styles.text}>Итого:</p>
                        <div className={styles.dots}></div>
                        <span className={styles.price}>{totalPrice} руб.</span>
                      </li>
                      <li className={styles.itemsProps}>
                        <p className={styles.text}>Налог 5%:</p>
                        <div className={styles.dotsSec}></div>
                        <span className={styles.price}>{total} руб.</span>
                      </li>
                    </ul>
                    <button
                      disabled={isBuy}
                      style={{ backgroundColor: isBuy && "grey" }}
                      className={styles.buttonConfirm}
                      onClick={onClickBuy}
                    >
                      Оформить заказ
                      <Icon className={styles.arrowRight} id={"arrowRight"} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Empty
                imgUrl={isBuy ? "img/emptySuccess.png" : "img/Empty.png"}
                title={isBuy ? "Заказ оформлен!" : "Корзина пустая"}
                text={
                  isBuy
                    ? `Ваш заказ #${shopProductsLength} скоро будет передан курьерской доставке`
                    : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                }
                onClickButton={setIsShow}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
