import { useCart } from "../context/CartContext.jsx";
import "./carrito.css";

export default function Carrito() {
    const { items, removeFromCart, clearCart, total } = useCart();
    const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

    if (!items.length) {
        return (
            <div className="page">
                <div className="container">
                    <h1>Carrito</h1>
                    <p className="cart-empty">No hay productos en el carrito.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <h1>Carrito</h1>

                <ul className="cart-list">
                    {items.map((it) => (
                        <li key={`${it.tipo}-${it.id}`} className="card cart-item">
                            {it.imagen && (
                                <img
                                    className="cart-thumb"
                                    src={it.imagen}
                                    alt={it.titulo}
                                    width="64"
                                    height="64"
                                />
                            )}

                            <div className="cart-info">
                                <div className="cart-title">{it.titulo}</div>
                                <div className="cart-meta">{it.tipo} · Cant.: {it.qty}</div>
                            </div>

                            <div className="cart-price">{euro.format(Number(it.precio) * it.qty)}</div>

                            <button
                                className="cart-btn cart-remove"
                                onClick={() => removeFromCart(it.id, it.tipo)}
                            >
                                Quitar
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="cart-footer">
                    <button className="cart-btn cart-clear" onClick={clearCart}>Vaciar carrito</button>
                    <div className="cart-total">Total: {euro.format(total)}</div>
                </div>
            </div>
        </div>
    );
}
