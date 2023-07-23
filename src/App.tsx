import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardPage from "./components/pages/DashboardPage";
import SetupPage from "./components/pages/SetupPage";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import RootLayout from "./components/layout/RootLayout";
import SetupLayout from "./components/layout/SetupLayout";
import AuthProvider from "./components/providers/AuthProvider";

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
                    path="/"
                    element={
                        <AuthProvider>
                            <RootLayout />
                        </AuthProvider>
                    }
                >
                    <Route
                        index
                        element={
                            <SetupLayout>
                                <SetupPage />
                            </SetupLayout>
                        }
                    />
                    <Route
                        path=":storeId"
                        element={
                            <DashboardLayout>
                                <DashboardPage />
                            </DashboardLayout>
                        }
                    />
                </Route>
            </Routes>
        </ClerkProvider>
    );
};

export default App;
