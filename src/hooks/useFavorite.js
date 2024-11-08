import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";

export const useFavorite = () => {

    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_PORT}/favorite`, fetcher,{
        revalidateOnFocus: false
    });  
    
    const favorites = data?.length > 0 ? data : [];

    if(error || !data) {
        return {
            addFavorite: () => {},
            isFindFavorite: () => {},
            favorites: [],
            error: error
        }
    }

    const removeFavorite = (id) => {
        fetcher(`${import.meta.env.VITE_PORT}/favorite/${id}`, {
            method: "DELETE",
        })
        mutate(
            favorites.filter(item => item.id !== id)
            , { revalidate: false } 
        )      
    };   

    const isFindFavorite = (id) => {
        return favorites?.find((item) => item.id === id)?.id;
    };

    const addFavorite = (product) => {
        if(isFindFavorite(product.id)) {
            removeFavorite(product.id);
            return;
        }

        fetcher(`${import.meta.env.VITE_PORT}/favorite`, {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(product),
        })
        mutate(
            favorites.concat(product)
            ,
            { revalidate: false }     
        )
    }


    return { 
        addFavorite,
        isFindFavorite,
        favorites,
        error: error,
    };
}   

