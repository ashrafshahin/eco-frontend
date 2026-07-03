import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "learncart_cart";

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((i) => i._id === product._id);
            if (existing) {
                return prev.map((i) =>
                    i._id === product._id
                        ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock ?? 99) }
                        : i
                );
            }
            return [
                ...prev,
                {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.mainImage || product.images?.[0],
                    stock: product.stock,
                    quantity,
                },
            ];
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((i) => (i._id === productId ? { ...i, quantity } : i))
        );
    };

    const removeFromCart = (productId) => {
        setItems((prev) => prev.filter((i) => i._id !== productId));
    };

    const clearCart = () => setItems([]);

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
};