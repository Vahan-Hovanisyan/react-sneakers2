import React from "react";
import { Catalog } from "@/components";
import { useShop } from "@/hooks/useShop";

export const Shop = () => {
  const { shop, isLoading, error } = useShop();

  if (error) {
    return <div> failed to load </div>;
  }

  return (
    <Catalog products={shop.flat()} isLoading={isLoading}>
      <h2>moi pokupki</h2>
    </Catalog>
  );
};
