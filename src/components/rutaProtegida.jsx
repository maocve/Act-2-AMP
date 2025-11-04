import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RutaProtegida({ children }) {
    const { isAuth } = useAuth();
    return isAuth ? children : <Navigate to="/login" replace />;
}
