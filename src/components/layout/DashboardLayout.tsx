import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useStoreModal } from "../../hooks/useStoreModal";
import Navbar from "../Navbar/Navbar";
import useStore from "../../hooks/useStore";

const DashboardLayout = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const { onClose, isOpen } = useStoreModal();

    const { data: stores, isLoading } = useStore();

    useEffect(() => {
        console.log("Dashboard layout called");
        if (isOpen) {
            onClose();
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const currentStore = stores?.find((store) => store.id === storeId);
            if (!currentStore) {
                navigate("/");
            }
        }
    }, [isLoading, navigate, storeId, stores]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default DashboardLayout;
