import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";

export const useBasket = () => {
    const { data, error, mutate } = useSWR("https://sneakers222backend.vercel.app/basket", fetcher);
    const basket = data?.length > 0 ? data : [];

    if (error || !data) {
        return {
            totalPrice: 0,
            total: 0,
            addProduct: () => { },
            isFindProduct: () => { },
            basket: [],
            error: error
        }
    }
    const isFindProduct = (id) => {
        return basket.find((item) => item.id === id)?.id;
    };

    const removeProduct = (id) => {
        mutate(fetch(`https://sneakers222backend.vercel.app/basket/${id}`, {
            method: "DELETE",
        }));

    };
    const addProduct = (product) => {

        if (isFindProduct(product.id)) {
            removeProduct(product.id);
        } else {
            mutate(fetch("https://sneakers222backend.vercel.app/basket", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(product),
            }),
                { populateCache: false }
            );

        }
    };
    const totalPrice = basket.reduce((sum, item) => item.price + sum, 0);
    const total = totalPrice * 5 / 100
    return {
        removeProduct,
        totalPrice,
        total,
        addProduct,
        isFindProduct,
        basket,
        error,
    }

}
