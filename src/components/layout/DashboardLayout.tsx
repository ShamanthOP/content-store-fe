import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { Store } from "../../lib/types";
import { useStoreModal } from "../../hooks/useStoreModal";

const DashboardLayout = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const { userId, token } = useUser();
    const { onClose } = useStoreModal();

    const [store, setStore] = useState<Store>();

    useEffect(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        const getStoreData = async () => {
            console.log(storeId);
            const response = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL as string
                }/store/${storeId as string}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("RESPONSE", response.data);
            const store = response.data as Store;
            console.log("Dashboard layout", store);
            if (!store) {
                navigate("/");
            }
            setStore(store);
        };
        void getStoreData();
    }, [storeId, token, navigate]);

    useEffect(() => {
        if (!userId) {
            navigate(`/sign-in`, { replace: true });
        }
    }, [userId, navigate]);

    return (
        <>
            <div>{store?.id} Navbar</div>
            <Outlet />
        </>
    );
};

export default DashboardLayout;
