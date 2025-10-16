"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<any[]>([]);

    // Lấy giỏ hàng từ localStorage khi reload
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) setCartItems(JSON.parse(savedCart));
    }, []);

    // Lưu giỏ hàng vào localStorage khi thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Thêm sản phẩm
    const addToCart = (product: any) => {
        setCartItems((prev) => {
            const exist = prev.find((p) => p.id === product.id);
            if (exist) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // Xóa sản phẩm
    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((p) => p.id !== id));
    };

    // Cập nhật số lượng
    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity } : p))
        );
    };

    // Tổng tiền
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

// export const useCart = () => useContext(CartContext);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartsProvider");
  return context;
};