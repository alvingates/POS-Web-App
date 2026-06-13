import React from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-32 overflow-y-auto content-start h-full custom-scrollbar pr-2">
      {products.map((product) => (
        <motion.button
          key={product.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(product)}
          className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-3 group text-left"
        >
          <div className={`h-32 w-full ${product.color || 'bg-slate-200'} rounded-xl flex items-center justify-center overflow-hidden relative`}>
            {product.image && (
              <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 group-hover:scale-110 shadow-sm transition-transform">
                <Plus className="w-8 h-8" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
            <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{product.name}</h3>
            <p className="text-lg font-black text-slate-900 mt-1">${product.price.toFixed(2)}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
