import { useAuth } from "../context/AuthContext.jsx";
import "./perfil.css";

export default function Perfil() {
    const { logout } = useAuth();

    return (
        <div className="page">
            <div className="container">
                <h1 className="title-center">Perfil</h1>
                <p className="subtitle-center muted">Ruta protegida. Solo usuarios autenticados.</p>

                <section className="profile-header card">
                    <div className="avatar">U</div>
                    <div className="profile-info">
                        <h2 className="profile-name">Usuario</h2>
                        <p className="profile-email">usuario@correo.com</p>
                    </div>
                    <button className="btn-logout" onClick={logout}>Cerrar sesión</button>
                </section>

                <section className="profile-grid">
                    <div className="card kpi">
                        <div className="kpi-value">3</div>
                        <div className="kpi-label">Pedidos</div>
                    </div>
                    <div className="card kpi">
                        <div className="kpi-value">5</div>
                        <div className="kpi-label">Favoritos</div>
                    </div>
                    <div className="card kpi">
                        <div className="kpi-value">2</div>
                        <div className="kpi-label">Reseñas</div>
                    </div>
                </section>

                <section className="card prefs">
                    <h3>Preferencias</h3>
                    <ul className="pref-list">
                        <li>Newsletter semanal</li>
                        <li>Recordatorios de eventos</li>
                        <li>Recomendaciones personalizadas</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
