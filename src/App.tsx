import React, { useState } from 'react';
import { Sidebar, View } from './components/Sidebar';
import { ProductGrid } from './components/ProductGrid';
import { CartPanel } from './components/CartPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductsView } from './components/ProductsView';
import { CATEGORIES, MOCK_PRODUCTS } from './data';
import { CartItem, Product, Transaction } from './types';
import { Search, Store, ShoppingBag, Menu } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<View>('POS');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart actions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity === 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const currentSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const currentTotal = currentSubtotal * 1.08;

  const handleCheckoutComplete = (method: 'Cash' | 'Card') => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      subtotal: currentSubtotal,
      tax: currentSubtotal * 0.08,
      total: currentTotal,
      method,
      timestamp: new Date(),
    };
    
    setTransactions((prev) => [newTransaction, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar 
        activeView={activeView} 
        onNavigate={(v) => { setActiveView(v); setIsMobileSidebarOpen(false); }}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {activeView === 'POS' ? (
        <>
          <main className="flex-1 flex flex-col min-w-0 relative">
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0">
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="hidden md:flex w-10 h-10 bg-indigo-600 rounded-lg items-center justify-center text-white shadow-md shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-800">
                  Lumina <span className="hidden md:inline">Retail Store #402</span>
                </h1>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>System Online</span>
                </div>
                <div className="hidden md:block h-8 w-[1px] bg-slate-200"></div>
                
                <button 
                  onClick={() => setIsMobileCartOpen(true)}
                  className="md:hidden relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white translate-x-1/4 -translate-y-1/4">
                      {cart.length}
                    </span>
                  )}
                </button>

                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold leading-none text-slate-800">Alvin E.</p>
                    <p className="text-xs text-slate-400">Cashier</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
                    AE
                  </div>
                </div>
              </div>
            </header>

            <section className="flex-1 flex flex-col p-4 md:p-6 gap-4 md:gap-6 bg-slate-50 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4 shrink-0">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Scan barcode or search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                  />
                </div>
                <div className="flex gap-2 shrink-0 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-3 border rounded-xl text-sm font-medium shadow-sm transition-colors whitespace-nowrap ${
                        activeCategory === category
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative">
                <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
              </div>
            </section>
            
            <footer className="hidden md:flex h-8 bg-slate-900 text-slate-400 items-center justify-between px-6 shrink-0 text-[10px] uppercase font-bold tracking-widest">
              <div className="flex gap-6">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Terminal 01-A</span>
                <span>Build v1.4.2</span>
              </div>
              <div className="flex gap-6">
                <span>Receipt Printer: Online</span>
                <span>Card Reader: Connected</span>
                <span className="text-slate-300">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).toUpperCase()}</span>
              </div>
            </footer>
          </main>

          <CartPanel
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => {
              setIsMobileCartOpen(false);
              setIsCheckoutOpen(true);
            }}
            isOpen={isMobileCartOpen}
            onClose={() => setIsMobileCartOpen(false)}
          />
        </>
      ) : activeView === 'Products' ? (
        <div className="flex-1 flex flex-col min-w-0">
          <ProductsView 
            products={products} 
            onAddProduct={(p) => setProducts([p, ...products])} 
            onUpdateProduct={(p) => setProducts(products.map(prod => prod.id === p.id ? p : prod))}
            onDeleteProduct={(id) => setProducts(products.filter(prod => prod.id !== id))}
            onMenuClick={() => setIsMobileSidebarOpen(true)}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-500">
          <h2 className="text-xl font-bold tracking-tight text-slate-800">{activeView} view is under construction</h2>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
        total={currentTotal}
      />
    </div>
  );
}
