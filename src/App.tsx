import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardPage from "./components/pages/DashboardPage";
import SetupPage from "./components/pages/SetupPage";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import RootLayout from "./components/layout/RootLayout";
import SetupLayout from "./components/layout/SetupLayout";
import AuthProvider from "./components/providers/AuthProvider";
import SettingsPage from "./components/pages/SettingsPage";
import BillboardsPage from "./components/pages/BillboardsPage";
import BillboardPage from "./components/pages/BillboardPage";
import CategoriesPage from "./components/pages/CategoriesPage";
import CategoryPage from "./components/pages/CategoryPage";
import SizesPage from "./components/pages/SizesPage";
import SizePage from "./components/pages/SizePage";
import ColorsPage from "./components/pages/ColorsPage";
import ColorPage from "./components/pages/ColorPage";
import ProductsPage from "./components/pages/ProductsPage";
import ProductPage from "./components/pages/ProductPage";
import OrdersPage from "./components/pages/OrdersPage";

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
                    <Route path=":storeId" element={<DashboardLayout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="billboards" element={<BillboardsPage />} />
                        <Route
                            path="billboards/:billboardId"
                            element={<BillboardPage />}
                        />
                        <Route path="categories" element={<CategoriesPage />} />
                        <Route
                            path="categories/:categoryId"
                            element={<CategoryPage />}
                        />
                        <Route path="sizes" element={<SizesPage />} />
                        <Route path="sizes/:sizeId" element={<SizePage />} />
                        <Route path="colors" element={<ColorsPage />} />
                        <Route path="colors/:colorId" element={<ColorPage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route
                            path="products/:productId"
                            element={<ProductPage />}
                        />
                        <Route path="orders" element={<OrdersPage />} />
                    </Route>
                </Route>
            </Routes>
        </ClerkProvider>
    );
};

export default App;
