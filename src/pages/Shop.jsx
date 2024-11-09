import React from "react";
import {Catalog} from "@/components";
import { useShop } from "@/hooks/useShop";

export const Shop = () => {
  const { shop, isLoading } = useShop();
  return (
    <Catalog 
      products={shop.flat()} 
      isLoading={isLoading}
    >
      <h2>moi pokupki</h2>
    </Catalog>
  );
};

