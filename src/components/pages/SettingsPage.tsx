import { Navigate, useParams } from "react-router-dom";
import useStore from "../../hooks/useStore";
import SettingsForm from "../SettingsForm";

const SettingsPage = () => {
    const { storeId } = useParams();
    const { data: stores } = useStore();

    const currentStore = stores?.find((store) => store.id === storeId);

    if (!currentStore) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={currentStore} />
            </div>
        </div>
    );
};

export default SettingsPage;
