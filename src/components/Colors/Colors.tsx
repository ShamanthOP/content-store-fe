import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { Separator } from "../ui/Separator";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ColorColumn, columns } from "./ColorColumns";
import { DataTable } from "../ui/DataTable";
import ApiList from "../Api/ApiList";

interface ColorsProps {
    data: ColorColumn[];
}

const Colors: React.FC<ColorsProps> = ({ data }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage colors for your store"
                />
                <Button onClick={() => navigate("new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API calls for Colors" />
            <Separator />
            <ApiList entityName="colors" entityIdName="colorId" />
        </>
    );
};

export default Colors;
