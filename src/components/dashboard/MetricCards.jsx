//summary widget

// src/components/dashboard/MetricCards.jsx
import React from 'react';
import { useErpCalculations } from '../hook/useErpCalculations';

const MetricCards = ({ data = [] }) => {
  const metrics = useErpCalculations(data);

  // Helper to format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const cards = [
    {
      title: 'Total Sales',
      value: formatCurrency(metrics.totalSales),
      subtitle: `${formatCurrency(metrics.paidSales)} Received`,
      badge: 'Revenue',
      border: 'border-emerald-500/30',
      valueColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      title: 'Total Purchases',
      value: formatCurrency(metrics.totalPurchases),
      subtitle: `${formatCurrency(metrics.paidPurchases)} Paid`,
      badge: 'Expense',
      border: 'border-blue-500/30',
      valueColor: 'text-blue-400',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Gross Profit',
      value: formatCurrency(metrics.grossProfit),
      subtitle: metrics.grossProfit >= 0 ? 'Net Margin Margin Positive' : 'Net Margin Deficit',
      badge: metrics.grossProfit >= 0 ? 'Profit' : 'Loss',
      border: 'border-amber-500/40',
      valueColor: metrics.grossProfit >= 0 ? 'text-amber-400' : 'text-rose-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      title: 'Accounts Receivable',
      value: formatCurrency(metrics.totalReceivables),
      subtitle: 'Pending Sales Collections',
      badge: 'Receivable',
      border: 'border-purple-500/30',
      valueColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Accounts Payable',
      value: formatCurrency(metrics.totalPayables),
      subtitle: 'Pending Vendor Bills',
      badge: 'Payable',
      border: 'border-rose-500/30',
      valueColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`bg-slate-800/80 backdrop-blur border ${card.border} rounded-xl p-4 shadow-lg flex flex-col justify-between hover:border-amber-400/50 transition-all`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {card.title}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${card.badgeBg}`}>
              {card.badge}
            </span>
          </div>

          <div className="my-1">
            <h2 className={`text-2xl font-extrabold ${card.valueColor} tracking-tight font-mono`}>
              {card.value}
            </h2>
          </div>

          <p className="text-[11px] text-slate-400 mt-1 border-t border-slate-700/50 pt-2">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;