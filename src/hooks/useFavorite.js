import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";

export const useFavorite = () => {



    const { data, error, mutate } = useSWR("https://sneakers222backend.vercel.app/favorite", fetcher);  
    
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
        mutate(
            fetcher(`https://sneakers222backend.vercel.app/favorite/${id}`, {
            method: "DELETE",
            
        }), { populateCache: false } 
          
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

        mutate(
            fetcher("https://sneakers222backend.vercel.app/favorite", {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(product),
            }),
            { populateCache: false }     
        )
    }


    return { 
        addFavorite,
        isFindFavorite,
        favorites,
        error: error,
    };
}   

