export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  color?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  method: 'Cash' | 'Card';
  timestamp: Date;
}
