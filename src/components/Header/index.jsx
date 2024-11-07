import styles from "./header.module.css";
import logoUrl from "@/Assets/logo.png";
import {Icon} from "../index";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBasket } from "@/hooks/useBasket";
import { isShowBasket } from "@/store/isShowBasket";

const navLinks = [
  {
    id: "basket",
    link: "#",
    text: "",
  },
  {
    id: "favorite",
    link: "favorite",
    text: "Закладки ",
  },
  {
    id: "profile",
    link: "/shop",
    text: "Профиль",
  },
];
 export const Header = (props) => {
  // const { onClickBasketOpen } = props;
  const [navIsopen, setNavIsopen] = useState(false);
  const { totalPrice } = useBasket();
  const { setIsShow } = isShowBasket();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <img
            className={styles.logoImg}
            src={logoUrl}
            alt="logo"
            width={40}
            height={40}
          />
          <strong className={styles.logoStrong}>React Sneakers</strong>
          <span className={styles.logoSpan}>Магазин лучших кроссовок</span>
        </Link>
        <nav
          className={
            navIsopen ? styles.nav + " " + styles.navActive : styles.nav
          }
        >
          <ul className={styles.navList}>
            {navLinks.map((obj) => (
              <li className={styles.navItem} key={obj.text}>
                <Link
                  className={styles.navLink}
                  onClick={() => obj.id === "basket" && setIsShow()}
                  to={obj.link}
                >
                  <Icon id={obj.id} className={styles.icon} />
                  {obj.id === "basket" ? `${totalPrice} руб.` : obj.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={styles.burger}
          onClick={() => {
            setNavIsopen(!navIsopen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};


