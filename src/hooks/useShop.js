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

  const isSomeShopProduct = (id) => {
    return shop.some((item) => item.id === id);
  };

  const isFindShopProduct = (id) => {
    return shop.find((item) => item.id === id)?.id;
  };

  const addShop = async (product) => {
    await fetcher(`${import.meta.env.VITE_PORT}/shop`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...product }),
    });

    mutate(`${import.meta.env.VITE_PORT}/shop`, [...shop, { ...product }]);

    product?.forEach(async (obj) => {
      await fetcher(`${import.meta.env.VITE_PORT}/basket/${obj.id}`, {
        method: "DELETE",
      }),
        mutate(`${import.meta.env.VITE_PORT}/basket`, []);
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
