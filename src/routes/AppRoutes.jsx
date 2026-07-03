import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/customer/Home";
import ProductListing from "../pages/customer/ProductListing";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import OrderSuccess from "../pages/customer/OrderSuccess";
import OrderFailed from "../pages/customer/OrderFailed";
import MyOrders from "../pages/customer/MyOrders";
import Profile from "../pages/customer/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResendVerification from "../pages/auth/ResendVerification";
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
            { path: "my-orders", element: <MyOrders /> },
            { path: "profile", element: <Profile /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password/:token", element: <ResetPassword /> },
            { path: "verify-email/:token", element: <VerifyEmail /> },
            { path: "resend-verification", element: <ResendVerification /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;