import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";
import { useSWRConfig } from "swr";
export const useShop = () => {
    const { mutate } = useSWRConfig()
    const { data, error, } = useSWR("http://localhost:3000/shop", fetcher);
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
        mutate("http://localhost:3000/shop", fetch("http://localhost:3000/shop", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(product),
        }),
            { populateCache: false }
        );

        product?.forEach((obj) => {
            mutate(
                "http://localhost:3000/basket",
                fetch(`http://localhost:3000/basket/${obj.id}`, {
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