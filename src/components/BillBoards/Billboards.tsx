import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { Separator } from "../ui/Separator";
import { useNavigate } from "react-router-dom";

const BillBoards = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Billboards(0)"
                    description="Manage billboards for your store"
                />
                <Button onClick={() => navigate("new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    );
};

export default BillBoards;
