import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const location = useLocation();
    const token = localStorage.getItem("token");
    // TODO: once AuthContext exists, read role from there instead of a raw localStorage flag
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};