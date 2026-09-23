// src/components/dashboard/Sidebar.jsx
import { useState } from 'react';
import { BarChart3, BookOpen, ChevronLeft, ChevronRight, CircleUserRound } from 'lucide-react';
import { theme } from '../../theme/token';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'invoices',  label: 'Purchase & Sale Book', icon: BookOpen },
  ];

  return (
    <aside
      className={`${theme.elements.sidebar.aside} ${
        isCollapsed ? 'w-[76px]' : 'w-64'
      } max-md:w-[76px]`}
    >
      {/* ───── Collapse Toggle ───── */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className={theme.elements.sidebar.collapseButton}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* ───── Brand ───── */}
      <div className={`px-4 pt-5 pb-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="relative shrink-0">
            <div className={theme.elements.sidebar.brandMark}>
              E
            </div>
          </div>

          {/* Brand text */}
          {!isCollapsed && (
            <div className="min-w-0 transition-opacity duration-200">
              <h2 className={`${theme.elements.sidebar.brandText} max-md:hidden`}>
                ERP Enterprise
              </h2>
              <p className={`${theme.elements.sidebar.brandSubtext} max-md:hidden`}>
                FINANCE & ACCOUNTING
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ───── Divider ───── */}
      <div className={theme.elements.sidebar.divider} />

      {/* ───── Navigation ───── */}
      <nav className="flex-1 px-3 pt-5 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <p className={`${theme.elements.sidebar.sectionLabel} max-md:hidden`}>
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
              className={`${theme.elements.sidebar.item} ${
                isCollapsed ? 'px-0 py-3 justify-center' : 'px-3 py-2.5 justify-between max-md:justify-center max-md:px-0'
              } ${
                isActive
                  ? theme.elements.sidebar.itemActive
                  : theme.elements.sidebar.itemIdle
              }`}
            >
              {/* Left accent bar (only active) */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-amber-500 transition-all duration-200 ${
                  isActive ? 'h-5 opacity-100' : 'h-0 opacity-0'
                }`}
              />

              {/* Icon + Label */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="shrink-0"
                >
                  <item.icon size={17} strokeWidth={1.8} />
                </span>
                {!isCollapsed && (
                  <span className="truncate text-left max-md:hidden">{item.label}</span>
                )}
              </div>

            </button>
          );
        })}
      </nav>

      {/* ───── Footer / User ───── */}
      <div className="p-3">
        <div className={`${theme.elements.sidebar.divider} mb-3`} />

        <div
          className={`${theme.elements.sidebar.userArea} ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-amber-600 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-400">
              <CircleUserRound size={18} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
          </div>

          {/* User info */}
          {!isCollapsed && (
            <div className="min-w-0 flex-1 max-md:hidden">
              <p className="truncate text-xs font-semibold leading-tight text-slate-900 dark:text-slate-100">
                Amna Saleem
              </p>
              <p className="mt-0.5 truncate text-[10px] leading-tight text-slate-500">
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