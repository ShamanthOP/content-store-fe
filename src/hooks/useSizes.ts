import { useQuery } from "@tanstack/react-query";
import { Size } from "../lib/types";
import useGet from "./useGet";
import { useParams } from "react-router-dom";

const useSizes = () => {
    const customGet = useGet();
    const params = useParams();
    const { data, isLoading, error } = useQuery<Size[]>({
        queryKey: ["sizes"],
        queryFn: async () => {
            const sizes = (await customGet(
                `/${params.storeId!}/sizes`
            )) as Size[];
            return sizes;
        },
    });

    return { data, isLoading, error };
};

export default useSizes;
