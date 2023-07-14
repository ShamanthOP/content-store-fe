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
                <Route element={<RootLayout />}>
                    <Route
                        path="/"
                        element={
                            <>
                                <SignedIn>
                                    <SetupPage />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                </Route>
            </Routes>
        </ClerkProvider>
    );
};

export default App;
