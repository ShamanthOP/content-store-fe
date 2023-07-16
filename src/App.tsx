import {
    ClerkProvider,
    RedirectToSignIn,
    SignIn,
    SignUp,
    SignedIn,
    SignedOut,
} from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import SetupPage from "./components/SetupPage";
import RootLayout from "./components/layout/RootLayout";
import SetupLayout from "./components/layout/SetupLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./components/DashboardPage";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env
    .VITE_REACT_APP_CLERK_PUBLISHABLE_KEY as string;

const App = () => {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={clerkPubKey}
            navigate={(to) => navigate(to)}
        >
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route
                        path="/sign-in/*"
                        element={<SignIn routing="path" path="/sign-in" />}
                    />
                    <Route
                        path="/sign-up/*"
                        element={<SignUp routing="path" path="/sign-up" />}
                    />
                </Route>
                <Route
                    element={
                        <>
                            <SignedIn>
                                <RootLayout />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                >
                    <Route element={<SetupLayout />}>
                        <Route path="/" element={<SetupPage />}></Route>
                    </Route>
                    <Route element={<DashboardLayout />}>
                        <Route path="/:storeId" element={<DashboardPage />} />
                    </Route>
                </Route>
            </Routes>
        </ClerkProvider>
    );
};

export default App;
