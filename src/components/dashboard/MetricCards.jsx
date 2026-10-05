import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Receipt, 
  Wallet 
} from 'lucide-react';

export default function MetricCard({ title, amount, currency, color = 'emerald', subtitle, iconName }) {
  const colorClasses = {
    emerald: {
      border: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
    rose: {
      border: 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40',
      text: 'text-rose-400',
      iconBg: 'bg-rose-500/10 text-rose-400',
    },
    indigo: {
      border: 'border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/40',
      text: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 text-indigo-400',
    },
    amber: {
      border: 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-400',
    },
    sky: {
      border: 'border-sky-500/20 bg-sky-500/5 hover:border-sky-500/40',
      text: 'text-sky-400',
      iconBg: 'bg-sky-500/10 text-sky-400',
    },
    purple: {
      border: 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40',
      text: 'text-purple-400',
      iconBg: 'bg-purple-500/10 text-purple-400',
    },
  };

  const currentTheme = colorClasses[color] || colorClasses.indigo;
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;

  const formattedAmount = new Intl.NumberFormat(currency?.locale || 'en-US', {
    style: 'currency',
    currency: currency?.code || 'USD',
    maximumFractionDigits: 0,
  }).format(safeAmount);

  const getIcon = () => {
    switch (iconName) {
      case 'sales': return <TrendingUp className="w-5 h-5" />;
      case 'purchase': return <ShoppingBag className="w-5 h-5" />;
      case 'profit': return <DollarSign className="w-5 h-5" />;
      case 'receivable': return <Clock className="w-5 h-5" />;
      case 'payable': return <Receipt className="w-5 h-5" />;
      case 'received': return <ArrowDownLeft className="w-5 h-5" />;
      case 'paid': return <ArrowUpRight className="w-5 h-5" />;
      default: return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className={`border p-5 rounded-2xl bg-slate-900/80 transition-all duration-200 ${currentTheme.border}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
        <div className={`p-2.5 rounded-xl ${currentTheme.iconBg}`}>
          {getIcon()}
        </div>
      </div>
      <p className={`text-2xl font-bold ${currentTheme.text}`}>
        {formattedAmount}
      </p>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-2 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}