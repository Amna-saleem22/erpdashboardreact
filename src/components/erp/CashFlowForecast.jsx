import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CashFlowForecast({ currentCash, expectedIn, expectedOut, chartData, currency }) {
  const projectedCash = currentCash + expectedIn - expectedOut;

  const formatAmount = (val) => `${currency.symbol}${val.toLocaleString(currency.locale)}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> 30-Day Cash Flow Forecast
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Predictive liquidity based on pending receivables & payable due dates
          </p>
        </div>
        <span className="flex items-center gap-1 text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
          <Calendar className="w-3.5 h-3.5" /> Next 30 Days
        </span>
      </div>

      {/* Figures Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Current Cash */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium mb-1">
            <Wallet className="w-4 h-4 text-sky-400" /> Current Cash (Collected)
          </p>
          <p className="text-xl font-bold text-white">{formatAmount(currentCash)}</p>
        </div>

        {/* Expected In */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium mb-1">
            <ArrowUpRight className="w-4 h-4" /> Expected In (AR)
          </p>
          <p className="text-xl font-bold text-emerald-400">+{formatAmount(expectedIn)}</p>
        </div>

        {/* Expected Out */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl">
          <p className="text-xs text-rose-400 flex items-center gap-1 font-medium mb-1">
            <ArrowDownRight className="w-4 h-4" /> Expected Out (AP)
          </p>
          <p className="text-xl font-bold text-rose-400">-{formatAmount(expectedOut)}</p>
        </div>

        {/* Expected 30-Day Cash */}
        <div className="bg-gradient-to-br from-indigo-900/60 to-indigo-950/60 border border-indigo-500/30 p-4 rounded-xl">
          <p className="text-xs text-indigo-300 font-semibold mb-1">Expected 30-Day Cash</p>
          <p className="text-2xl font-black text-indigo-200">{formatAmount(projectedCash)}</p>
        </div>
      </div>

      {/* Recharts Area Graph: Today -> 7 Days -> 14 Days -> 30 Days */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="timeframe" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(v) => `${currency.symbol}${v}`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
              formatter={(value) => [`${currency.symbol}${Number(value).toLocaleString()}`, 'Projected Cash']}
            />
            <Area 
              type="monotone" 
              dataKey="cash" 
              stroke="#818cf8" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorCash)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}