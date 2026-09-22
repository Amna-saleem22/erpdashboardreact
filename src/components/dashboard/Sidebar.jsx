// src/components/dashboard/Sidebar.jsx
import React, { useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: 'Live' },
    { id: 'invoices',  label: 'Purchase & Sale Book', icon: '📑' },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-slate-950 text-slate-100 border-r border-slate-800/60 min-h-screen font-sans transition-[width] duration-300 ease-out ${
        isCollapsed ? 'w-[76px]' : 'w-64'
      }`}
    >
      {/* ───── Collapse Toggle ───── */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className="absolute -right-3 top-8 z-20 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center text-[10px] font-bold hover:bg-amber-500 hover:border-amber-400 hover:text-slate-950 transition-all duration-200 shadow-lg shadow-black/30"
      >
        {isCollapsed ? '❯' : '❮'}
      </button>

      {/* ───── Brand ───── */}
      <div className={`px-4 pt-5 pb-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-md" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/30">
              E
            </div>
          </div>

          {/* Brand text */}
          {!isCollapsed && (
            <div className="min-w-0 transition-opacity duration-200">
              <h2 className="text-[13px] font-bold text-white tracking-tight leading-none truncate">
                ERP Enterprise
              </h2>
              <p className="text-[9.5px] text-amber-400/90 font-bold tracking-[0.12em] mt-1 truncate">
                FINANCE & ACCOUNTING
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ───── Divider ───── */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      {/* ───── Navigation ───── */}
      <nav className="flex-1 px-3 pt-5 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 px-3 mb-3">
            Main Menu
          </p>
        )}

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`group relative w-full flex items-center gap-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                isCollapsed ? 'px-0 py-3 justify-center' : 'px-3 py-2.5 justify-between'
              } ${
                isActive
                  ? 'bg-slate-800/70 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
              }`}
            >
              {/* Left accent bar (only active) */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-amber-400 transition-all duration-300 ${
                  isActive ? 'h-5 opacity-100' : 'h-0 opacity-0'
                }`}
              />

              {/* Icon + Label */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`text-base shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' : ''
                  }`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="truncate text-left">{item.label}</span>
                )}
              </div>

              {/* Badge (Live) */}
              {!isCollapsed && item.badge && (
                <span className="shrink-0 inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  {item.badge}
                </span>
              )}

              {/* Badge dot in collapsed mode */}
              {isCollapsed && item.badge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ───── Footer / User ───── */}
      <div className="p-3">
        <div className="mx-1 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-3" />

        <div
          className={`flex items-center gap-3 rounded-xl p-2 hover:bg-slate-900 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-bold text-xs text-amber-400">
              AS
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>

          {/* User info */}
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-100 truncate leading-tight">
                Amna Saleem
              </p>
              <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                ERP Administrator
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;