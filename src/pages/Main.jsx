import React from "react";
import { Catalog, Slider } from "@/components";
import { useProducts } from "@/hooks/useProducts";

export const Main = () => {
  const { products } = useProducts();
  console.log( products );
  return (
    <main>
      <Slider />
      <Catalog products={products}>
        <h2>Все кроссовки</h2>
      </Catalog>
    </main>
  );
};

