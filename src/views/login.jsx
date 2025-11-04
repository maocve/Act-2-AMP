import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./login.css";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === "admin" && clave === "1234") {
            login();
            navigate("/perfil");
        } else {
            alert("Credenciales incorrectas (admin/1234)");
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="login">
                    <h1 className="title-center">Iniciar sesión</h1>

                    <form onSubmit={handleSubmit} className="login-form card">
                        <label className="field">
                            <span className="label">Usuario</span>
                            <input
                                className="control"
                                placeholder="Usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </label>

                        <label className="field">
                            <span className="label">Contraseña</span>
                            <input
                                className="control"
                                type="password"
                                placeholder="Contraseña"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit" className="add-btn">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
