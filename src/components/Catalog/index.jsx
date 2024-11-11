import { useState } from "react";
import styles from "./catalog.module.css";
import { Card, Search } from "../index";
import { Skeleton } from "../Card/Skeleton";

export const Catalog = (props) => {
  const { products, children, isLoading } = props;

  const [searchValue, setSearchValue] = useState("");

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const sneakers = products
    .filter((obj) =>
      obj.title?.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .map((obj) => (
      <li key={obj.id}>
        {" "}
        <Card {...obj} />{" "}
      </li>
    ));

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
          <Search value={searchValue} setValue={setSearchValue} />
        </div>
        <ul className={styles.list}>{isLoading ? skeletons : sneakers}</ul>
      </div>
    </section>
  );
};
