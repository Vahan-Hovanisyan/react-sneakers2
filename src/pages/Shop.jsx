import React from "react";
import {Catalog} from "@/components";
import { useShop } from "@/hooks/useShop";

export const Shop = () => {
  const { shop } = useShop();
  return (
    <Catalog products={shop.flat()}>
      <h2>moi pokupki</h2>
    </Catalog>
  );
};

