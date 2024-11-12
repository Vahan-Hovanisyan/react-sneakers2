import useSWR from "swr";
import { fetcher } from "../helper/fetcher";

export const useFavorite = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${import.meta.env.VITE_PORT}/favorite`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const favorites = data?.length > 0 ? data : [];
  // console.log(favorites);
  if (error || !data) {
    return {
      addFavorite: () => {},
      removeFavorite: () => {},
      isFindFavorite: () => {},
      isSomeFavorite: () => {},
      favorites: [],
      isLoading,
      error: error,
    };
  }

  const isFindFavorite = (id) => {
    return favorites?.find((item) => item.productId === id)?.id;
  };

  const isSomeFavorite = (id) => {
    return favorites?.some((item) => item.productId === id);
  };

  const removeFavorite = async (id) => {
    await fetcher(`${import.meta.env.VITE_PORT}/favorite/${id}`, {
      method: "DELETE",
    });
    mutate(favorites.filter((item) => item.id !== id));
  };

  const addFavorite = async (product) => {
    if (isSomeFavorite(product.productId)) return;
    await fetcher(`${import.meta.env.VITE_PORT}/favorite`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    });
    mutate([...favorites, product]);
  };

  return {
    addFavorite,
    isSomeFavorite,
    removeFavorite,
    isFindFavorite,
    favorites,
    isLoading,
    error: error,
  };
};
