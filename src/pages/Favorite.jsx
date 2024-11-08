import React from "react";
import {Catalog,Empty} from "@/components";
import { useFavorite } from "@/hooks/useFavorite";

export const Favorite = () => {
  const { favorites } = useFavorite();

  return (
    <main>
      {favorites.length > 0 ? (
        <Catalog
          products={favorites}
        >
          <h2>все закладки</h2>
        </Catalog>
      ) : (
        <Empty
          title="Закладок нет :("
          text="Вы ничего не добавляли в закладки"
          imgUrl="img/emptyFavorite.png"
        />
      )}
    </main>
  );
};
