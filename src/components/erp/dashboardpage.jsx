// src/pages/Dashboard.jsx
import React, { useState, useMemo } from 'react';
import { mockData } from '../../data/generateErpData';
import { useErpCalculations } from '../hook/useErpCalculations';

import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

import {
  Heading, Text, Card, Button, Badge, ChartCard
} from '../ui/Index';

const Dashboard = () => {
  const [chartType, setChartType] = useState('area');
  const metrics = useErpCalculations(mockData);

  const formatCurrency = (val) => `Rs. ${(val || 0).toLocaleString()}`;

  const monthlyTrendsData = useMemo(() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const trendMap = months.map((m) => ({ month: m, revenue: 0, expenses: 0, profit: 0 }));

    mockData.forEach((item) => {
      const dateObj = new Date(item.date);
      const monthIndex = dateObj.getMonth();
      if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
        if (item.type === 'SALE') trendMap[monthIndex].revenue += item.totalAmount;
        else if (item.type === 'PURCHASE') trendMap[monthIndex].expenses += item.totalAmount;
      }
    });

    return trendMap.map((item) => ({ ...item, profit: item.revenue - item.expenses }));
  }, []);

  const kpiCards = [
    {
      title: 'Total Sales',
      value: formatCurrency(metrics.totalSales),
      subtitle: `${formatCurrency(metrics.paidSales)} Received`,
      badge: 'Revenue',
      badgeVariant: 'success',
      valueColor: 'text-emerald-700',
    },
    {
      title: 'Total Purchases',
      value: formatCurrency(metrics.totalPurchases),
      subtitle: `${formatCurrency(metrics.paidPurchases)} Paid`,
      badge: 'Expense',
      badgeVariant: 'info',
      valueColor: 'text-sky-700',
    },
    {
      title: 'Gross Profit',
      value: formatCurrency(metrics.grossProfit),
      subtitle: metrics.grossProfit >= 0 ? 'Margin Positive' : 'Margin Deficit',
      badge: metrics.grossProfit >= 0 ? 'Profit' : 'Loss',
      badgeVariant: metrics.grossProfit >= 0 ? 'warning' : 'danger',
      valueColor: metrics.grossProfit >= 0 ? 'text-amber-700' : 'text-rose-700',
    },
    {
      title: 'Accounts Receivable',
      value: formatCurrency(metrics.totalReceivables),
      subtitle: 'Pending Sales Collections',
      badge: 'Receivable',
      badgeVariant: 'info',
      valueColor: 'text-indigo-700',
    },
    {
      title: 'Accounts Payable',
      value: formatCurrency(metrics.totalPayables),
      subtitle: 'Pending Vendor Bills',
      badge: 'Payable',
      badgeVariant: 'danger',
      valueColor: 'text-rose-700',
    },
  ];

  const chartColors = {
    revenue: '#10b981',
    expenses: '#0284c7',
    profit:  '#f59e0b',
    grid:    '#e2e8f0',
    axis:    '#64748b',
  };

  const tooltipStyle = {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: '10px',
    color: '#0f172a',
    boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
    fontSize: '12px',
  };

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto space-y-5">

        {/* ============ HEADER ============ */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Heading level="h1">Dashboard Overview</Heading>
              <Badge variant="warning">Live Audit</Badge>
            </div>
            <Text variant="sm" className="mt-1">
              Financial summary and analytical visualization of Purchase & Sale books.
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary">Export Report</Button>
            <Button variant="primary">+ New Invoice</Button>
          </div>
        </div>

        {/* ============ KPI CARDS ============ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiCards.map((card, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start gap-2 mb-3">
                <Text variant="caption" className="uppercase font-bold tracking-wider">
                  {card.title}
                </Text>
                <Badge variant={card.badgeVariant}>{card.badge}</Badge>
              </div>

              <div className="my-1">
                <Heading
                  level="h3"
                  className={`${card.valueColor} font-mono tracking-tight`}
                >
                  {card.value}
                </Heading>
              </div>

              <Text variant="micro" className="mt-3 border-t border-slate-100 pt-2">
                {card.subtitle}
              </Text>
            </Card>
          ))}
        </div>

        {/* ============ CHART ============ */}
        <ChartCard
          title="Financial Analytics & Revenue Trends"
          subtitle="Monthly cash flow comparison of Revenue, Expenses, and Net Profit"
          actionButton={
            <div className="flex items-center gap-4">
              {/* Total Sales — ab header mein, chart pe overlap NAHI karega */}
              <div className="hidden sm:flex flex-col items-end pr-3 border-r border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total Sales
                </span>
                <span className="text-base font-bold font-mono text-amber-600 leading-tight">
                  {formatCurrency(metrics.totalSales)}
                </span>
              </div>

              {/* Chart Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <Button
                  variant={chartType === 'area' ? 'primary' : 'secondary'}
                  onClick={() => setChartType('area')}
                >
                  Area View
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'primary' : 'secondary'}
                  onClick={() => setChartType('bar')}
                >
                  Bar View
                </Button>
              </div>
            </div>
          }
        >
          <div className="w-full h-[400px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={monthlyTrendsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={chartColors.revenue}  stopOpacity={0.35}/>
                      <stop offset="95%" stopColor={chartColors.revenue}  stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={chartColors.expenses} stopOpacity={0.35}/>
                      <stop offset="95%" stopColor={chartColors.expenses} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={chartColors.profit}   stopOpacity={0.35}/>
                      <stop offset="95%" stopColor={chartColors.profit}   stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="month" stroke={chartColors.axis} tick={{ fill: chartColors.axis, fontSize: 12 }} />
                  <YAxis stroke={chartColors.axis} tick={{ fill: chartColors.axis, fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ paddingTop: '16px' }}
                  />
                  <Area type="monotone" dataKey="revenue"  name="Revenue"    stroke={chartColors.revenue}  fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="expenses" name="Expenses"   stroke={chartColors.expenses} fillOpacity={1} fill="url(#colorExpenses)" />
                  <Area type="monotone" dataKey="profit"   name="Net Profit" stroke={chartColors.profit}   fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              ) : (
                <BarChart data={monthlyTrendsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="month" stroke={chartColors.axis} tick={{ fill: chartColors.axis, fontSize: 12 }} />
                  <YAxis stroke={chartColors.axis} tick={{ fill: chartColors.axis, fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ paddingTop: '16px' }}
                  />
                  <Bar dataKey="revenue"  name="Revenue"    fill={chartColors.revenue}  radius={[4,4,0,0]} />
                  <Bar dataKey="expenses" name="Expenses"   fill={chartColors.expenses} radius={[4,4,0,0]} />
                  <Bar dataKey="profit"   name="Net Profit" fill={chartColors.profit}   radius={[4,4,0,0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>
    </div>
  );
};

export default Dashboard;