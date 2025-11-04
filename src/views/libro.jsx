import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { apiPost } from "../services/api";
import { useCart } from "../context/CartContext.jsx";
import "./libro.css";

export default function Libro() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const { data: libro, loading: l1, error: e1 } = useFetchData(`/books/${id}`);
    const { data: apiComentarios, loading: l2, error: e2 } = useFetchData(`/books/${id}/comentarios`);

    const [comentarios, setComentarios] = useState([]);
    useEffect(() => {
        if (Array.isArray(apiComentarios)) setComentarios(apiComentarios);
    }, [apiComentarios]);

    const [puntuacion, setPuntuacion] = useState(5);
    const [comentario, setComentario] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [msg, setMsg] = useState("");

    const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
    const getCat = (l) => l?.["categoría"] ?? l?.categoria ?? l?.category ?? "";

    const enviarComentario = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMsg("");
        try {
            await apiPost(`/books/${id}/comentarios`, {
                puntuacion: Number(puntuacion),
                comentario,
            });
            setComentarios((prev) => [...prev, { puntuacion: Number(puntuacion), comentario }]);
            setPuntuacion(5);
            setComentario("");
            setMsg("¡Comentario publicado!");
        } catch {
            setMsg("Error al publicar el comentario");
        } finally {
            setEnviando(false);
        }
    };

    if (l1 || l2) {
        return (
            <div className="page">
                <div className="container">
                    <div className="loading-center">Cargando…</div>
                </div>
            </div>
        );
    }
    if (e1) {
        return (
            <div className="page">
                <div className="container">
                    <p className="error">Error: {e1}</p>
                </div>
            </div>
        );
    }
    if (e2) {
        return (
            <div className="page">
                <div className="container">
                    <p className="error">Error comentarios: {e2}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container book-container">
                <div className="book-detail">
                    {libro?.imagen && (
                        <img
                            className="book-cover-lg"
                            src={libro.imagen}
                            alt={libro.titulo}
                            width="220"
                            height="320"
                        />
                    )}

                    <div className="book-main">
                        <h1 className="book-title-lg">{libro?.titulo}</h1>
                        <p><strong>Autor:</strong> {libro?.autor}</p>
                        <p><strong>Categoría:</strong> {getCat(libro)}</p>
                        <p><strong>Año:</strong> {libro?.["año"] ?? libro?.anio ?? libro?.year}</p>
                        {libro?.sinopsis && <p className="book-sinopsis">{libro.sinopsis}</p>}
                        {libro?.precio != null && (
                            <p className="book-price-lg">{euro.format(Number(libro.precio))}</p>
                        )}

                        <div className="cta-row">
                            <button
                                className="btn add-btn"
                                onClick={() =>
                                    addToCart({
                                        id: libro.id,
                                        tipo: "libro",
                                        titulo: libro.titulo,
                                        precio: libro.precio || 0,
                                        imagen: libro.imagen,
                                    })
                                }
                            >
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>

                <h2 className="section-title">Comentarios</h2>
                {(!comentarios || comentarios.length === 0) ? (
                    <p className="muted">No hay comentarios todavía.</p>
                ) : (
                    <ul className="comment-list">
                        {comentarios.map((c, i) => (
                            <li key={i} className="comment-item">
                                {c.puntuacion ? `⭐ ${c.puntuacion} — ` : ""}
                                {c.comentario}
                            </li>
                        ))}
                    </ul>
                )}

                <h3 className="section-subtitle">Añadir comentario</h3>
                <form onSubmit={enviarComentario} className="comment-form">
                    <div className="field">
                        <span className="label">Puntuación</span>
                        <div className="rating" role="radiogroup" aria-label="Puntuación de 1 a 5">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    className={`star ${n <= puntuacion ? "on" : ""}`}
                                    aria-pressed={n === puntuacion}
                                    onClick={() => setPuntuacion(n)}
                                >
                                    {n <= puntuacion ? "★" : "☆"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="field">
                        <span className="label">Comentario</span>
                        <textarea
                            className="control"
                            placeholder="Escribe tu comentario"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            required
                            rows="4"
                        />
                    </label>

                    <button disabled={enviando} className="btn add-btn">
                        {enviando ? "Enviando…" : "Publicar"}
                    </button>
                </form>

                {msg && <p className="form-msg">{msg}</p>}
            </div>
        </div>
    );
}
