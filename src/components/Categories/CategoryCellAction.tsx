import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import AlertModal from "../modals/AlertModal";
import { CategoryColumn } from "./CategoryColumns";

interface CategoryCellActionProps {
    data: CategoryColumn;
}

const CategoryCellAction: React.FC<CategoryCellActionProps> = ({ data }) => {
    const params = useParams();
    const navigate = useNavigate();
    const customDelete = useDelete();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = async (id: string) => {
        await navigator.clipboard.writeText(id);
        toast.success("Category Id copied to the clipboard");
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await customDelete(`/${params.storeId!}/categories/${data.id}`);
            navigate(0);
            toast.success("Category deleted");
        } catch (error) {
            console.log(error);
            toast.error(
                "Something went wrong. Make sure you removed all products using this category."
            );
        } finally {
            setOpen(false);
            setIsLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CategoryCellAction;
