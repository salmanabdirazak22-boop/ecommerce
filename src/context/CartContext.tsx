"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      if (session) {
        try {
          const res = await fetch('/api/cart');
          const data = await res.json();
          if (data.items) {
            setItems(data.items.map((item: any) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
              image: item.product.images?.[0]
            })));
          }
        } catch (e) {
          console.error("Failed to fetch cart from DB", e);
        }
      } else {
        const savedCart = localStorage.getItem('lumiere_cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (e) {
            console.error("Failed to parse local cart", e);
          }
        }
      }
    };
    fetchCart();
  }, [session]);

  // Sync to local storage / DB
  useEffect(() => {
    if (!session) {
      localStorage.setItem('lumiere_cart', JSON.stringify(items));
    }
  }, [items, session]);

  const addItem = async (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const updatedItems = [...items];
    const existing = updatedItems.find(item => item.id === newItem.id);
    const qty = newItem.quantity || 1;

    if (existing) {
      existing.quantity += qty;
    } else {
      updatedItems.push({ ...newItem, quantity: qty });
    }
    
    setItems(updatedItems);
    setIsCartOpen(true);

    if (session) {
      const existingItem = updatedItems.find(item => item.id === newItem.id);
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: newItem.id, quantity: existingItem?.quantity }),
      });
    }
  };

  const removeItem = async (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    if (session) {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: 0 }), // Using 0 to signal removal in our simplistic API
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedItems = items.map(item => item.id === id ? { ...item, quantity } : item);
    setItems(updatedItems);
    if (session) {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity }),
      });
    }
  };

  const clearCart = () => {
    setItems([]);
    if (!session) localStorage.removeItem('lumiere_cart');
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      isCartOpen, setIsCartOpen, toggleCart, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
