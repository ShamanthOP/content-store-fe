import { useQuery } from "@tanstack/react-query";
import { Category } from "../lib/types";
import useGet from "./useGet";
import { useParams } from "react-router-dom";

const useCategories = () => {
    const customGet = useGet();
    const params = useParams();
    const { data, isLoading, error } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const categories = (await customGet(
                `/${params.storeId!}/categories`
            )) as Category[];
            return categories;
        },
    });

    return { data, isLoading, error };
};

export default useCategories;
