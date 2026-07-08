import { createBrowserRouter } from "react-router";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AccountLayout from "../layouts/AccountLayout";
import AdminLayout from "../layouts/AdminLayout";

// Customer pages
import Home from "../pages/customer/Home";
import ProductListing from "../pages/customer/ProductListing";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import OrderSuccess from "../pages/customer/OrderSuccess";
import OrderFailed from "../pages/customer/OrderFailed";
import MyOrders from "../pages/customer/MyOrders";
import Profile from "../pages/customer/Profile";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResendVerification from "../pages/auth/ResendVerification";

// Admin pages
import Dashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import ManageUsers from "../pages/admin/ManageUsers";
import UserDetails from "../pages/admin/UserDetails";
import ManageOrders from "../pages/admin/ManageOrders";

// Fallback
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <ProductListing /> },
            { path: "products/:id", element: <ProductDetails /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <Checkout /> },
            { path: "order-success", element: <OrderSuccess /> },
            { path: "order-failed", element: <OrderFailed /> },

            {
                path: "",
                element: <AccountLayout />,
                children: [
                    { path: "profile", element: <Profile /> },
                    { path: "my-orders", element: <MyOrders /> },
                ],
            },

            { path: "*", element: <NotFound /> },
        ],
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "products", element: <ManageProducts /> },
            { path: "products/create", element: <AddProduct /> },
            { path: "products/edit/:id", element: <EditProduct /> },
            { path: "users", element: <ManageUsers /> },
            { path: "users/:id", element: <UserDetails /> },
            { path: "orders", element: <ManageOrders /> },
            { path: "*", element: <NotFound /> },

        ],
    },

    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "/verify-email/:token", element: <VerifyEmail /> },
    { path: "/resend-verification", element: <ResendVerification /> },
]);

export default router;