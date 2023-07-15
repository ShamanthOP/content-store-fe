import { Outlet, redirect } from "react-router-dom";
import ModalProvider from "../providers/ModalProvider";
import ToastProvider from "../providers/ToastProvider";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const RootLayout = () => {
    const userStore = useUser();
    const { userId, getToken, isLoaded } = useAuth();

    useEffect(() => {
        const getData = async () => {
            const token = await getToken();
            if (!token || !userId) {
                redirect("/sign-in");
            }
            userStore.setToken(token!);
            userStore.setUserId(userId!);
        };
        if (isLoaded) {
            void getData();
        }
    }, [isLoaded, userId]);

    return (
        <>
            <ToastProvider />
            <ModalProvider />
            <Outlet />
        </>
    );
};

export default RootLayout;
