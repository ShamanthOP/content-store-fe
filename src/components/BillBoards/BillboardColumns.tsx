import { ColumnDef } from "@tanstack/react-table";
import BillboardCellAction from "./BillboardCellAction";

export type BillboardCloumn = {
    id: string;
    label: string;
    createdAt: string;
};

export const columns: ColumnDef<BillboardCloumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Date created",
    },
    {
        id: "actions",
        cell: ({ row }) => <BillboardCellAction data={row.original} />,
    },
];
