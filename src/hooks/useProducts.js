import useSWR  from "swr";
import { fetcher } from "../helper/fetcher";

export const useProducts = () => {
    const { data, error,isLoading } = useSWR("http://localhost:3000/products", fetcher);

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