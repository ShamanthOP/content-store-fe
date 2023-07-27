import BillBoards from "../BillBoards/Billboards";

const BillboardsPage = () => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillBoards />
            </div>
        </div>
    );
};

export default BillboardsPage;
