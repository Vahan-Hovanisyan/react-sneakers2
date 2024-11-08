import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";

export const useBasket = () => {
    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_PORT}/basket`, fetcher,{
        revalidateOnFocus: false
    });
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
    const isFindProduct = (id, toggle = false) => {
        if (!toggle) return basket.find((item) => item.id === id)?.currentId;
        return basket.find((item) => item.currentId === id)?.id;
    };

    const removeProduct = (id) => {
        fetcher(`${import.meta.env.VITE_PORT}/basket/${id}`, {
            method: "DELETE",
        })
        mutate(
            basket.filter(item => item.currentId !== id),
            { revalidate: false }
        );

    };
    const addProduct = (product) => {

        if (isFindProduct(product.id)) {
            removeProduct(isFindProduct(product.id));
        } else {
           fetcher(`${import.meta.env.VITE_PORT}/basket`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(product),
            })
            mutate(
              basket.concat(product),
              { revalidate: false }
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
