import React from "react";
import {Catalog} from "@/components";
import { useShop } from "@/hooks/useShop";

 const Shop = () => {
  const { shop } = useShop();
  console.log(shop.flat());
  return (
    <Catalog products={shop.flat()}>
      <h2>moi pokupki</h2>
    </Catalog>
  );
};

export default Shop;
