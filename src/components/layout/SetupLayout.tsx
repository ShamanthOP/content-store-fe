import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { Store } from "../../lib/types";

const SetupLayout = () => {
    const { userId, token } = useUser();
    const [storeId, setStoreId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate(`/sign-in`, { replace: true });
        }
    }, [userId, navigate]);

    useEffect(() => {
        const getStoreData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_REACT_APP_BACKEND_URL as string}/store`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const store = response.data as Store;
            // console.log(store);
            if (store) {
                setStoreId(store.id);
            }
        };
        void getStoreData();
    }, [token]);

    useEffect(() => {
        if (storeId) {
            navigate(`/${storeId}`);
        }
    }, [storeId, navigate]);

    return <Outlet />;
};

export default SetupLayout;
