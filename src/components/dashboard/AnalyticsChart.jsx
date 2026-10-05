import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { BarChart3, AreaChart as AreaIcon, LineChart as LineIcon, Maximize2, Minimize2 } from 'lucide-react';

export default function SalesChart({ data = [], currency, title = "Financial Performance Analytics" }) {
  const [chartType, setChartType] = useState('bar');
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-slate-500 text-sm">
        Chart render karne ke liye koi data available nahi hai.
      </div>
    );
  }

  const formatChartValue = (val) => {
    return new Intl.NumberFormat(currency?.locale || 'en-US', {
      style: 'currency',
      currency: currency?.code || 'USD',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="purchGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={formatChartValue} />
            <Tooltip
              formatter={(value) => [formatChartValue(value)]}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }}
            />
            <Legend />
            <Area type="monotone" dataKey="Sales" stroke="#10b981" fillOpacity={1} fill="url(#salesGrad)" name="Inflow / Revenue" />
            <Area type="monotone" dataKey="Purchases" stroke="#f43f5e" fillOpacity={1} fill="url(#purchGrad)" name="Outflow / Expense" />
          </AreaChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={formatChartValue} />
            <Tooltip
              formatter={(value) => [formatChartValue(value)]}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="Sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Inflow / Revenue" />
            <Line type="monotone" dataKey="Purchases" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} name="Outflow / Expense" />
          </LineChart>
        );

      case 'bar':
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={formatChartValue} />
            <Tooltip
              formatter={(value) => [formatChartValue(value)]}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }}
            />
            <Legend />
            <Bar dataKey="Sales" fill="#10b981" radius={[6, 6, 0, 0]} name="Inflow / Revenue" />
            <Bar dataKey="Purchases" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Outflow / Expense" />
          </BarChart>
        );
    }
  };

  return (
    <div
      className={`bg-slate-900 border border-slate-800 transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 p-8 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between'
          : 'p-6 rounded-2xl'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-400">View performance breakdown across categories or time periods</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setChartType('bar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                chartType === 'bar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Bar
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                chartType === 'area' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <AreaIcon className="w-3.5 h-3.5" /> Area
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                chartType === 'line' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LineIcon className="w-3.5 h-3.5" /> Line
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Parent Height & Width fixed here */}
      <div className={`w-full ${isFullscreen ? 'h-[80vh]' : 'h-[350px] min-h-[300px]'}`}>
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}