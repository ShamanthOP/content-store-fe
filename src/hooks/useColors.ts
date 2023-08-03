import { useQuery } from "@tanstack/react-query";
import useGet from "./useGet";
import { useParams } from "react-router-dom";
import { Color } from "../lib/types";

const useColors = () => {
    const customGet = useGet();
    const params = useParams();
    const { data, isLoading, error } = useQuery<Color[]>({
        queryKey: ["colors"],
        queryFn: async () => {
            const colors = (await customGet(
                `/${params.storeId!}/colors`
            )) as Color[];
            return colors;
        },
    });

    return { data, isLoading, error };
};

export default useColors;
