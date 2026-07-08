import { createBrowserRouter } from "react-router";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AccountLayout from "../layouts/AccountLayout";

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

            // Account section — shares sidebar via AccountLayout, still nested inside MainLayout
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

    // Auth pages — full-screen split layout, no Navbar/Footer
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "/verify-email/:token", element: <VerifyEmail /> },
    { path: "/resend-verification", element: <ResendVerification /> },
]);

export default router;