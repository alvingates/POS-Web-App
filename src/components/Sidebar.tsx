import { LayoutDashboard, Receipt, Settings, ShoppingBag, Users, Store, X } from 'lucide-react';
import React from 'react';

export type View = 'POS' | 'Products' | 'Transactions' | 'Customers' | 'Settings';

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ activeView, onNavigate, isOpen, onClose }: SidebarProps) {
  const NavButton = ({ view, children }: { view: View, children: React.ReactNode }) => {
    const isActive = activeView === view;
    return (
      <button 
        onClick={() => onNavigate(view)}
        className={`p-3 md:p-3 w-full flex items-center md:justify-center gap-3 rounded-xl transition-colors shrink-0 ${isActive ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white text-slate-400'}`}
        title={view}
      >
        {children}
        <span className="md:hidden font-medium">{view}</span>
      </button>
    );
  };

  return (
    <>
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <nav className={`fixed inset-y-0 left-0 w-64 md:w-20 bg-slate-900 flex flex-col items-start md:items-center py-6 gap-4 text-slate-400 border-r border-slate-800 shrink-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between w-full px-6 md:px-0 md:justify-center mb-2 md:mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              R
            </div>
            <span className="md:hidden text-white font-bold text-xl tracking-tight">Lumina</span>
          </div>
          <button onClick={onClose} className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col gap-2 w-full px-4 md:px-2 md:items-center">
          <NavButton view="POS">
            <Store className="w-6 h-6" />
          </NavButton>
          <NavButton view="Products">
            <ShoppingBag className="w-6 h-6" />
          </NavButton>
          <NavButton view="Transactions">
            <Receipt className="w-6 h-6" />
          </NavButton>
          <NavButton view="Customers">
            <Users className="w-6 h-6" />
          </NavButton>
        </div>
        
        <div className="mt-auto w-full px-4 md:px-2 md:items-center pb-4 md:pb-0">
          <NavButton view="Settings">
            <Settings className="w-6 h-6" />
          </NavButton>
        </div>
      </nav>
    </>
  );
}
