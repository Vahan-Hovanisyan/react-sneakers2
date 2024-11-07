import React from "react";
import { Catalog, Slider } from "@/components";
import { useProducts } from "@/hooks/useProducts";

 const Main = () => {
  const { products } = useProducts();
  return (
    <main>
      <Slider />
      <Catalog products={products}>
        <h2>Все кроссовки</h2>
      </Catalog>
    </main>
  );
};

export default Main
