import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useCart } from "../context/CartContext.jsx";
import "./libros.css";

export default function Libros() {
    const { data: libros, loading, error } = useFetchData("/books");
    const { addToCart } = useCart();
    const [cat, setCat] = useState("Todas");
    const [q, setQ] = useState("");

    const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

    const getCat = (l) => l?.["categoría"] ?? l?.categoria ?? l?.category ?? "";
    const getYear = (l) => l?.["año"] ?? l?.anio ?? l?.year ?? "";
    const getAuthor = (l) => l?.autor ?? l?.author ?? "";
    const getTitle = (l) => l?.titulo ?? l?.title ?? "";

    const categorias = useMemo(() => {
        if (!Array.isArray(libros)) return ["Todas"];
        const set = new Set(
            libros
                .map((l) => getCat(l))
                .filter((v) => typeof v === "string" && v.trim().length > 0)
        );
        return ["Todas", ...Array.from(set)];
    }, [libros]);

    const filtrados = useMemo(() => {
        if (!Array.isArray(libros)) return [];
        const s = q.trim().toLowerCase();
        return libros
            .filter((l) => (cat === "Todas" ? true : getCat(l) === cat))
            .filter((l) => {
                if (!s) return true;
                return (
                    getTitle(l).toLowerCase().includes(s) ||
                    getAuthor(l).toLowerCase().includes(s)
                );
            });
    }, [libros, cat, q]);

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <div className="loading-center">Cargando libros…</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <div className="container">
                    <p className="error">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <h1 className="title-center">Catálogo de libros</h1>

                <div className="filters">
                    <select
                        className="control"
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        aria-label="Filtrar por categoría"
                    >
                        {categorias.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <input
                        className="control"
                        placeholder="Buscar por título o autor"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        aria-label="Buscar libros"
                    />
                </div>

                <ul className="book-list">
                    {filtrados.map((l) => (
                        <li key={l.id} className="book-card card">
                            {l.imagen && (
                                <img
                                    className="book-cover"
                                    src={l.imagen}
                                    alt={getTitle(l)}
                                    width="72"
                                    height="108"
                                />
                            )}

                            <div className="book-info">
                                <Link to={`/libros/${l.id}`} className="book-title">
                                    {getTitle(l)}
                                </Link>
                                <div className="book-meta">
                                    {getAuthor(l)} · {getCat(l)} · {getYear(l)}
                                </div>
                                {l.precio != null && (
                                    <div className="book-price">
                                        {euro.format(Number(l.precio))}
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn add-btn"
                                onClick={() =>
                                    addToCart({
                                        id: l.id,
                                        tipo: "libro",
                                        titulo: getTitle(l),
                                        precio: l.precio || 0,
                                        imagen: l.imagen,
                                    })
                                }
                            >
                                Añadir al carrito
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
