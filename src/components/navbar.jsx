import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import carritoIcono from "../assets/icono-carrito.svg";
import logoNexus from "../assets/logo-nexus.svg"; // ⬅️ IMPORTANTE
import "./navbar.css";

export default function Navbar() {
    const { isAuth, logout } = useAuth();
    const { count } = useCart();
    const navigate = useNavigate();

    const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

    return (
        <header className="nav">
            <div className="nav__inner container">
                <button className="nav__brand" onClick={() => navigate("/")} aria-label="Inicio">
                    <img src={logoNexus} alt="Nexus" className="nav__logo" />
                </button>

                <nav className="nav__links">
                    <NavLink to="/" className={linkClass} end>Inicio</NavLink>
                    <NavLink to="/libros" className={linkClass}>Libros</NavLink>
                    <NavLink to="/papeleria" className={linkClass}>Papelería</NavLink>

                    {isAuth ? (
                        <>
                            <NavLink to="/perfil" className={linkClass}>Perfil</NavLink>
                            <button
                                className="nav__btn"
                                onClick={() => { logout(); navigate("/login"); }}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav__pill">Login</NavLink>
                    )}

                    <div className="nav__icons">
                        <button
                            className="nav__iconbtn"
                            onClick={() => navigate("/carrito")}
                            aria-label="Carrito"
                        >
                            <img src={carritoIcono} alt="Carrito" className="nav__cartimg" />
                            {count > 0 && <span className="nav__badge">{count}</span>}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
