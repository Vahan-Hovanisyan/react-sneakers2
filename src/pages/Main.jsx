import React from "react";
import { Catalog, Slider } from "@/components";
import { useProducts } from "@/hooks/useProducts";

export const Main = () => {
  const { products, isLoading } = useProducts();
  return (
    <main>
      <Slider />
      <Catalog products={products} isLoading={isLoading}>
        <h2>Все кроссовки</h2>
      </Catalog>
    </main>
  );
};

