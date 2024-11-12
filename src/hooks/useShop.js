import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";
import { useSWRConfig } from "swr";
export const useShop = () => {
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_PORT}/shop`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  const shop = data?.length > 0 ? data?.map((obj) => Object.values(obj)) : [];
  if (error || !data) {
    return {
      shopProductsLength: 0,
      addShop: () => {},
      shop: [],
      error: error,
      isLoading,
    };
  }
  const addShop = (product) => {
    mutate(
      `${import.meta.env.VITE_PORT}/shop`,
      fetcher(`${import.meta.env.VITE_PORT}/shop`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...product }),
      }),
    );

    product?.forEach((obj) => {
      mutate(
        `${import.meta.env.VITE_PORT}/basket`,
        fetcher(`${import.meta.env.VITE_PORT}/basket/${obj.id}`, {
          method: "DELETE",
        }),
      );
    });
  };

  const shopProductsLength = shop.length;
  return {
    shopProductsLength,
    addShop,
    shop,
    error,
    isLoading,
  };
};
