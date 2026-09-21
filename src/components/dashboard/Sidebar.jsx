// src/components/dashboard/Sidebar.jsx
import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'invoices', label: 'Purchase & Sale Book', icon: '📑' },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-100 border-r border-slate-800/80 p-5 min-h-screen flex flex-col justify-between font-sans">
      <div>
        {/* Branding */}
        {/* <div className="mb-8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-amber-500/20">
            E
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 tracking-wide leading-none">ERP Enterprise</h2>
            <p className="text-[11px] text-amber-400 font-medium mt-1">Finance & Accounting</p>
          </div>
        </div> */}

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold px-3 mb-2">Main Menu</p>
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Info / Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-semibold text-xs text-amber-400">
          AS
        </div>
        <div className="overflow-hidden text-left">
          <p className="text-xs font-semibold text-slate-200 truncate">Amna Saleem</p>
          <p className="text-[10px] text-slate-500 truncate">ERP Administrator</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;