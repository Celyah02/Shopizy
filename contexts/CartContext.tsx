import React, { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
  name: string;
  price: string;
  delivery: string;
};

interface CartContextType {
  cart: Product[];
  cartCount: number;
  addToCart: (product: Product) => void;
  clearCart: () => void;
  isCartVisible: boolean;
  setIsCartVisible: (visible: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addToCart,
      clearCart,
      isCartVisible,
      setIsCartVisible,
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
