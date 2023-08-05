import { useQuery } from "@tanstack/react-query";
import { Store } from "../lib/types";
import useGet from "./useGet";

const useStore = () => {
    const customGet = useGet();
    const { data, isLoading, error } = useQuery<Store[]>({
        queryKey: ["stores"],
        queryFn: async () => {
            const stores = (await customGet("/")) as Store[];
            return stores;
        },
    });

    return { data, isLoading, error };
};

export default useStore;
