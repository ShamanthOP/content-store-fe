import { useQuery } from "@tanstack/react-query";
import useGet from "./useGet";
import { useParams } from "react-router-dom";
import { Order } from "../lib/types";

const useOrders = () => {
    const customGet = useGet();
    const params = useParams();
    const { data, isLoading, error } = useQuery<Order[]>({
        queryKey: ["orders"],
        queryFn: async () => {
            const orders = (await customGet(
                `/${params.storeId!}/orders`
            )) as Order[];
            return orders;
        },
    });

    return { data, isLoading, error };
};

export default useOrders;
