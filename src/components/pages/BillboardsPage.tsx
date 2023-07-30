import useBillboards from "../../hooks/useBillboards";
import { BillboardColumn } from "../BillBoards/BillboardColumns";
import BillBoards from "../BillBoards/Billboards";
import { format } from "date-fns";

const BillboardsPage = () => {
    const { data: billboards, isLoading } = useBillboards();

    if (isLoading || !billboards) {
        return null;
    }

    const formattedBillboards: BillboardColumn[] = billboards.map(
        (billboard) => ({
            id: billboard.id,
            label: billboard.label,
            createdAt: format(new Date(billboard.createdAt), "MMMM do, yyyy"),
        })
    );

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillBoards data={formattedBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
