import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]); // {id, tipo, titulo, precio, imagen, qty}

    const addToCart = (item) => {
        setItems((curr) => {
            const idx = curr.findIndex((i) => i.id === item.id && i.tipo === item.tipo);
            if (idx >= 0) {
                const copy = curr.slice();
                copy[idx] = { ...copy[idx], qty: copy[idx].qty + (item.qty || 1) };
                return copy;
            }
            return [...curr, { ...item, qty: item.qty || 1 }];
        });
    };

    const removeFromCart = (id, tipo) => {
        setItems((curr) => curr.filter((i) => !(i.id === id && i.tipo === tipo)));
    };

    const clearCart = () => setItems([]);

    const total = useMemo(
        () => items.reduce((acc, it) => acc + Number(it.precio || 0) * it.qty, 0),
        [items]
    );
    const count = useMemo(() => items.reduce((acc, it) => acc + it.qty, 0), [items]);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}
