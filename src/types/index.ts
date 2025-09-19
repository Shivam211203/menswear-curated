export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  description: string;
  isVisible: boolean;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  toggleCart: () => void;
}

export interface AdminFormData {
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: string;
  description: string;
  image: string;
  isVisible: boolean;
}