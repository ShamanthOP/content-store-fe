import { useQuery } from "@tanstack/react-query";
import useGet from "./useGet";
import { useParams } from "react-router-dom";
import { Product } from "../lib/types";

const useProducts = () => {
    const customGet = useGet();
    const params = useParams();
    const { data, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const products = (await customGet(
                `/${params.storeId!}/products?isArchived=true`
            )) as Product[];
            return products;
        },
    });

    return { data, isLoading, error };
};

export default useProducts;
