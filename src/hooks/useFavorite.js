import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";

export const useFavorite = () => {

    const { data, error, isLoading, mutate } = useSWR(`${import.meta.env.VITE_PORT}/favorite`, fetcher,{
        revalidateOnFocus: false
    });  
    
    const favorites = data?.length > 0 ? data : [];

    if(error || !data) {
        return {
            addFavorite: () => {},
            removeFavorite: () => {},
            isFindFavorite: () => {},
            isSomeFavorite: () => {},
            favorites: [],
            isLoading,
            error: error
        }
    }

    const removeFavorite = async (id, onClickToFavoriteProduct = false) => {

        const removeProductId = isFindFavorite(id);

      await  fetcher(`${import.meta.env.VITE_PORT}/favorite/${ onClickToFavoriteProduct ? id : removeProductId}`, {
            method: "DELETE",
        })
        mutate(
            favorites?.filter(item => item.productId !== id)
        )      
    };   

    const isFindFavorite = (id) => {
        return favorites?.find((item) => item.productId === id)?.id;
    };

    const isSomeFavorite = (id) => {
        return favorites?.some((item) => item.productId === id);
    };

    const addFavorite = async (product) => {
        if(isSomeFavorite(product.productId)) {
            removeFavorite(product.productId);
            return;
        }

       await fetcher(`${import.meta.env.VITE_PORT}/favorite`, {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(product),
        })
        mutate(
            [...favorites, product]
        )
    }


    return { 
        addFavorite,
        isSomeFavorite,
        removeFavorite,
        isFindFavorite,
        favorites,
        isLoading,
        error: error,
    };
}   

