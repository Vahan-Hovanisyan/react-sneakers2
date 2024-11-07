import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";
import { useSWRConfig } from "swr";
export const useShop = () => {
    const { mutate } = useSWRConfig()
    const { data, error, } = useSWR("https://sneakers222backend.vercel.app/shop", fetcher);
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
        mutate("https://sneakers222backend.vercel.app/shop", fetch("https://sneakers222backend.vercel.app/shop", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(product),
        }),
            { populateCache: false }
        );

        product?.forEach((obj) => {
            mutate(
                "https://sneakers222backend.vercel.app/basket",
                fetch(`https://sneakers222backend.vercel.app/basket/${obj.id}`, {
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
