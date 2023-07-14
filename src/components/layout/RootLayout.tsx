import { Outlet } from "react-router-dom";
import ModalProvider from "../providers/ModalProvider";
import ToastProvider from "../providers/ToastProvider";

const RootLayout = () => {
    return (
        <>
            <ToastProvider />
            <ModalProvider />
            <Outlet />
        </>
    );
};

export default RootLayout;
