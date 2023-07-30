import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { Separator } from "../ui/Separator";
import { useNavigate } from "react-router-dom";
import React from "react";
import { BillboardColumn, columns } from "./BillboardColumns";
import { DataTable } from "../ui/DataTable";
import ApiList from "../Api/ApiList";

interface BillBoardsProps {
    data: BillboardColumn[];
}

const BillBoards: React.FC<BillBoardsProps> = ({ data }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage billboards for your store"
                />
                <Button onClick={() => navigate("new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading title="API" description="API calls for Billboards" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    );
};

export default BillBoards;
