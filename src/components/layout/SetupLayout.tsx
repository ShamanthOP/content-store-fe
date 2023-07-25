import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

interface SetupLayoutProps {
    children: React.ReactNode;
}

const SetupLayout: React.FC<SetupLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const { data: stores, isLoading } = useStore();

    useEffect(() => {
        console.log("Setup layout called");
        if (!isLoading && stores?.length) {
            navigate(`/${stores[0].id}`);
        }
    }, [isLoading]);

    return <>{children}</>;
};

export default SetupLayout;
