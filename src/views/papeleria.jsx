import { useMemo } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useCart } from "../context/CartContext.jsx";
import "./papeleria.css";

export default function Papeleria() {
    const { data, loading, error } = useFetchData("/papeleria");
    const { addToCart } = useCart();
    const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

    const items = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    if (loading)
        return (
            <div className="page">
                <div className="container">
                    <div className="loading-center">Cargando productos…</div>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="page">
                <div className="container">
                    <p className="error">Error: {error}</p>
                </div>
            </div>
        );

    if (!items.length)
        return (
            <div className="page">
                <div className="container">
                    <p className="muted">No hay productos de papelería.</p>
                </div>
            </div>
        );

    return (
        <div className="page">
            <div className="container">
                <h1 className="title-center">Productos de Papelería</h1>

                <div className="papeleria-grid">
                    {items.map((item) => (
                        <div key={item.id} className="card papeleria-card">
                            {item.imagen && (
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className="papeleria-img"
                                />
                            )}
                            <h3 className="papeleria-title">{item.nombre}</h3>
                            <p className="papeleria-meta">
                                {item.marca} · {item.categoria}
                            </p>
                            <p className="papeleria-desc">
                                {item.descripcion?.length > 80
                                    ? item.descripcion.slice(0, 80) + "..."
                                    : item.descripcion}
                            </p>
                            <div className="papeleria-footer">
                                <strong>{euro.format(Number(item.precio))}</strong>
                                <button
                                    className="add-btn"
                                    onClick={() =>
                                        addToCart({
                                            id: item.id,
                                            tipo: "papeleria",
                                            titulo: item.nombre,
                                            precio: item.precio || 0,
                                            imagen: item.imagen,
                                        })
                                    }
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
