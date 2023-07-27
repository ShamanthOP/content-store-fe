import { useQuery } from "@tanstack/react-query";
import { Billboard } from "../lib/types";
import useGet from "./useGet";
import { useParams } from "react-router-dom";

const useBillboards = () => {
    const customGet = useGet();
    const params = useParams();
    const { data, isLoading, error } = useQuery<Billboard[]>({
        queryKey: ["billboards"],
        queryFn: async () => {
            const billboards = (await customGet(
                `/${params.storeId!}/billboards`
            )) as Billboard[];
            return billboards;
        },
    });

    return { data, isLoading, error };
};

export default useBillboards;
