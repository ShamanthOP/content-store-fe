import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { Separator } from "../ui/Separator";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ProductColumn, columns } from "./ProductColumns";
import { DataTable } from "../ui/DataTable";
import ApiList from "../Api/ApiList";

interface ProductsProps {
    data: ProductColumn[];
}

const Products: React.FC<ProductsProps> = ({ data }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
                />
                <Button onClick={() => navigate("new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API calls for Products" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    );
};

export default Products;
