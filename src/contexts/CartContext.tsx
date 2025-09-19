import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartContextType, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size: string; color: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, selectedSize: size, selectedColor: color }],
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, color, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
          ),
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, size, color } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'LOAD_CART':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fashionStore_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fashionStore_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color, quantity } });
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size, color } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const value: CartContextType = {
    items: state.items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    isOpen: state.isOpen,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};