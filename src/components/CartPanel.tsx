import React from 'react';
import { CartItem } from '../types';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartPanelProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function CartPanel({ cart, onUpdateQuantity, onRemoveItem, onCheckout, isOpen, onClose }: CartPanelProps) {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside className={`w-full md:w-[380px] bg-white border-l border-slate-200 flex flex-col shadow-2xl shrink-0 fixed inset-y-0 right-0 z-50 md:relative transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-800">Current Order</h2>
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider block md:hidden">
              {cart.length} Items
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-indigo-600 text-xs font-bold uppercase tracking-wider">
              {cart.length} Items
            </span>
            <button onClick={onClose} className="md:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <AnimatePresence>
          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200">
                <ShoppingBagIcon />
              </div>
              <p className="text-sm font-medium">Scan or add items to order</p>
            </motion.div>
          ) : (
            cart.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.product.id}
                className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border border-slate-200 text-slate-400 shrink-0 relative overflow-hidden ${item.product.color || 'bg-slate-200'}`}>
                  {item.product.image && (
                    <img src={item.product.image} alt={item.product.name} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{item.product.name}</p>
                  <p className="text-xs text-slate-500">{item.product.category}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-black text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      {item.quantity <= 1 ? <Trash2 className="w-3 h-3 text-rose-500" /> : <Minus className="w-3 h-3" />}
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm text-slate-500 font-medium font-mono">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500 font-medium font-mono">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="h-[1px] bg-slate-200" />
          <div className="flex justify-between text-xl font-black text-slate-900 uppercase">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Checkout
        </button>
      </div>
    </aside>
    </>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
