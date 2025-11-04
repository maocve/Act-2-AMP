import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
    return (
        <main className="landing">
            <section className="hero">
                <h1 className="title">Nexus</h1>
                <p className="subtitle">Tu punto de encuentro universitario</p>
                <p className="description">
                    Libros, coworking, café y comunidad. Todo en un mismo espacio.
                </p>
                <Link to="/libros" className="cta-btn">
                    Explorar catálogo
                </Link>
            </section>

            <section className="features">
                <div className="feature">
                    <h3>📚 Librería</h3>
                    <p>Encuentra los títulos académicos y novelas que necesitas.</p>
                </div>
                <div className="feature">
                    <h3>💻 Coworking</h3>
                    <p>Un espacio moderno para estudiar o trabajar en equipo.</p>
                </div>
                <div className="feature">
                    <h3>☕ Cafetería</h3>
                    <p>Disfruta de un café mientras lees o compartes ideas.</p>
                </div>
                <div className="feature">
                    <h3>🤝 Comunidad</h3>
                    <p>Eventos, talleres y encuentros para conectar con otros.</p>
                </div>
            </section>
        </main>
    );
}
