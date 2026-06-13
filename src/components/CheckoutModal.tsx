import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, X, CheckCircle2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (method: 'Cash' | 'Card') => void;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onComplete, total }: CheckoutModalProps) {
  const [method, setMethod] = useState<'Cash' | 'Card'>('Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onComplete(method);
        setIsSuccess(false);
      }, 1500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful</h2>
                <p className="text-slate-500">Receipt generated successfully</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Checkout</h2>
                  <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <div className="text-slate-500 mb-1 text-sm font-medium uppercase tracking-wider">Total Amount</div>
                  <div className="text-4xl font-bold text-slate-900">${total.toFixed(2)}</div>
                </div>

                <div className="space-y-4 mb-8">
                  <label className="text-sm font-medium text-slate-800 px-1">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setMethod('Card')}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        method === 'Card' 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-200 text-slate-500 hover:border-indigo-300'
                      }`}
                    >
                      <CreditCard className="w-8 h-8" />
                      <span className="font-bold tracking-wider uppercase text-xs">Card</span>
                    </button>
                    <button
                      onClick={() => setMethod('Cash')}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        method === 'Cash' 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-200 text-slate-500 hover:border-indigo-300'
                      }`}
                    >
                      <CreditCard className="w-8 h-8" />
                      <span className="font-bold tracking-wider uppercase text-xs">Cash</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                    />
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
