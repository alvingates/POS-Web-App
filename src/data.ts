import { Product } from './types';

export const CATEGORIES = ['All', 'Clothing', 'Electronics', 'Accessories', 'Food'];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Classic White T-Shirt', price: 19.99, category: 'Clothing', color: 'bg-slate-200' },
  { id: '2', name: 'Denim Jeans', price: 49.99, category: 'Clothing', color: 'bg-indigo-800' },
  { id: '3', name: 'Running Sneakers', price: 89.99, category: 'Clothing', color: 'bg-orange-500' },
  { id: '4', name: 'Wireless Headphones', price: 129.99, category: 'Electronics', color: 'bg-slate-800' },
  { id: '5', name: 'Smart Watch', price: 199.99, category: 'Electronics', color: 'bg-slate-900' },
  { id: '6', name: 'Leather Wallet', price: 39.99, category: 'Accessories', color: 'bg-amber-800' },
  { id: '7', name: 'Sunglasses', price: 24.99, category: 'Accessories', color: 'bg-stone-800' },
  { id: '8', name: 'Organic Coffee Beans', price: 14.99, category: 'Food', color: 'bg-amber-900' },
  { id: '9', name: 'Artisan Chocolate', price: 8.99, category: 'Food', color: 'bg-rose-900' },
  { id: '10', name: 'Portable Charger', price: 29.99, category: 'Electronics', color: 'bg-slate-400' },
  { id: '11', name: 'Cotton Hoodie', price: 34.99, category: 'Clothing', color: 'bg-slate-500' },
  { id: '12', name: 'Backpack', price: 45.99, category: 'Accessories', color: 'bg-emerald-800' },
];
