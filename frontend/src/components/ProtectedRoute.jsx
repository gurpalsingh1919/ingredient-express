// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
