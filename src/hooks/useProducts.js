import useSWR  from "swr";
import { fetcher } from "../helper/fetcher";

export const useProducts = () => {
    const { data, error,isLoading } = useSWR(`${import.meta.env.VITE_PORT}/products`, fetcher,{
        revalidateOnFocus: false
    });

    if (error || !data) {

        return {
            products: [],
            error,
            isLoading
        }
    }
    return {
        products: data,
        error,
        isLoading
        
    }
};
