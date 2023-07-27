import { useParams } from "react-router-dom";
import useBillboards from "../../hooks/useBillboards";
import BillboardForm from "../BillBoards/BillboardForm";

const BillboardPage = () => {
    const { data: billboards, isLoading } = useBillboards();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm
                    initialData={billboards?.find(
                        (billboard) => billboard.id === params.billboardId
                    )}
                />
            </div>
        </div>
    );
};

export default BillboardPage;
