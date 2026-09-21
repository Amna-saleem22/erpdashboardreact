// src/pages/Dashboard.jsx
import React, { useMemo } from 'react';
import { mockData } from '../data/generateErpData';

const Dashboard = () => {
  // Financial metrics calculation logic
  const metrics = useMemo(() => {
    const totalSales = mockData
      .filter((item) => item.type === 'SALE')
      .reduce((sum, item) => sum + item.totalAmount, 0);

    const totalPurchases = mockData
      .filter((item) => item.type === 'PURCHASE')
      .reduce((sum, item) => sum + item.totalAmount, 0);

    const totalTax = mockData.reduce((sum, item) => sum + item.taxAmount, 0);
    const netProfit = totalSales - totalPurchases;

    return { totalSales, totalPurchases, totalTax, netProfit, count: mockData.length };
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen font-sans">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-amber-400">Dashboard Overview</h1>
        <p className="text-xs text-slate-400 mt-1">
          Financial summary and analytical visualization of Purchase & Sale books.
        </p>
      </div>

      {/* KPI / Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Total Sales</p>
          <h3 className="text-xl font-bold text-emerald-400 mt-1">
            Rs. {metrics.totalSales.toLocaleString()}
          </h3>
          <p className="text-[10px] text-slate-500 mt-2">Revenue from all sale invoices</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Total Purchases</p>
          <h3 className="text-xl font-bold text-rose-400 mt-1">
            Rs. {metrics.totalPurchases.toLocaleString()}
          </h3>
          <p className="text-[10px] text-slate-500 mt-2">Expense from all purchase invoices</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Net Income / Profit</p>
          <h3 className={`text-xl font-bold mt-1 ${metrics.netProfit >= 0 ? 'text-amber-400' : 'text-rose-500'}`}>
            Rs. {metrics.netProfit.toLocaleString()}
          </h3>
          <p className="text-[10px] text-slate-500 mt-2">Sales minus Purchases</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Total Tax Liability</p>
          <h3 className="text-xl font-bold text-sky-400 mt-1">
            Rs. {metrics.totalTax.toLocaleString()}
          </h3>
          <p className="text-[10px] text-slate-500 mt-2">Combined tax across {metrics.count} invoices</p>
        </div>
      </div>

      {/* Charts Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-200 mb-4">Sales vs Purchase Trend</h4>
          <div className="h-48 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-500">
            📊 [Connect Recharts / Chart component here]
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-200 mb-4">Tax & Expense Distribution</h4>
          <div className="h-48 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-500">
            📈 [Connect Analytics chart component here]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;