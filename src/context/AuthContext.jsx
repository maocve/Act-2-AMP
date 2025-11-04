import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(localStorage.getItem("auth") === "true");
    }, []);

    const login = () => {
        localStorage.setItem("auth", "true");
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem("auth");
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
