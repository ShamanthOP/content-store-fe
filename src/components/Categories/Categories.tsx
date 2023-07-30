import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { Separator } from "../ui/Separator";
import { useNavigate } from "react-router-dom";
import React from "react";
import { DataTable } from "../ui/DataTable";
import ApiList from "../Api/ApiList";
import { CategoryColumn, columns } from "./CategoryColumns";

interface CategoriesProps {
    data: CategoryColumn[];
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button onClick={() => navigate("new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API calls for Categories" />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    );
};

export default Categories;
