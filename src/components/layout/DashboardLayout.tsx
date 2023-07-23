import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreModal } from "../../hooks/useStoreModal";
import Navbar from "../Navbar/Navbar";
import useStore from "../../hooks/useStore";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
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
            {children}
        </>
    );
};

export default DashboardLayout;
