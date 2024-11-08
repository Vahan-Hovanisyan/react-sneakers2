import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";
import { useSWRConfig } from "swr";
export const useShop = () => {
    const { mutate } = useSWRConfig()
    const { data, error, } = useSWR(`${import.meta.env.VITE_PORT}/shop`, fetcher,{
        revalidateOnFocus: false
    });
    const shop = data?.length > 0 ? data?.map(obj => Object.values(obj)) : [];
    if (error || !data) {
        return {
            shopProductsLength: 0,
            addShop: () => { },
            shop: [],
            error: error
        }
    }
    const addShop = (product) => {
        mutate(`${import.meta.env.VITE_PORT}/shop`, 
            fetch(`${import.meta.env.VITE_PORT}/shop`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(product),
            }),
            { populateCache: false }
        );

        product?.forEach((obj) => {
            mutate(
                `${import.meta.env.VITE_PORT}/basket`,
                fetch(`${import.meta.env.VITE_PORT}/basket/${obj.id}`, {
                    method: "DELETE",
                }),
                {
                    populateCache: false,
                }
            );
        });

    };

    const shopProductsLength = shop.length;
    return {
        shopProductsLength,
        addShop,
        shop,
        error,
    }
}
