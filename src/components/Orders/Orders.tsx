import React from "react";
import { DataTable } from "../ui/DataTable";
import Heading from "../ui/Heading";
import { Separator } from "../ui/Separator";
import { OrderColumn, columns } from "./OrderColumns";

interface OrdersProps {
    data: OrderColumn[];
}

const Orders: React.FC<OrdersProps> = ({ data }) => {
    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    );
};

export default Orders;
