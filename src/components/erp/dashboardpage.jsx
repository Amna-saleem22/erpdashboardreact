// src/pages/Dashboard.jsx
import { useState, useMemo } from 'react';
import { mockData } from '../../data/generateErpData';
import { downloadFinancialReport } from '../../data/exportFinancialReport';
import { useErpCalculations } from '../hook/useErpCalculations';

import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { AlertCircle, ArrowDownToLine, ArrowUpRight, CheckCircle2, LoaderCircle, CalendarDays, CircleDollarSign, FilePlus2, ReceiptText, WalletCards } from 'lucide-react';

import { Heading, Text, Button, ChartCard } from '../ui/Index';
import MetricCard from '../dashboard/MetricCards';
import FinancialOverview from '../dashboard/FinancialOverview';
import ThemeToggle from '../ui/ThemeToggle';
import { theme } from '../../theme/token';

const Dashboard = () => {
  const [chartType, setChartType] = useState('area');
  const [exportState, setExportState] = useState('idle');
  const [exportMessage, setExportMessage] = useState('');
  const metrics = useErpCalculations(mockData);

  const formatCurrency = (val) => `Rs. ${(val || 0).toLocaleString()}`;

  const exportReport = () => {
    if (exportState === 'exporting') return;

    setExportState('exporting');
    setExportMessage('Preparing report...');

    window.setTimeout(() => {
      try {
        const result = downloadFinancialReport(mockData, metrics);
        setExportState('success');
        setExportMessage(result.recordCount > 0
          ? `Report downloaded with ${result.recordCount} transactions.`
          : 'Report downloaded. No transaction records were available.');
      } catch (error) {
        setExportState('error');
        setExportMessage('Report could not be downloaded. Please try again.');
        console.error('Financial report export failed:', error);
      }
    }, 0);
  };

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

  const financialOverview = useMemo(() => {
    const paymentTypes = [
      { label: 'Paid', variant: 'success' },
      { label: 'Partial', variant: 'warning' },
      { label: 'Unpaid', variant: 'danger' },
    ];
    const paymentItems = paymentTypes.map(({ label, variant }) => ({
      label,
      variant,
      count: mockData.filter((item) => item.paymentStatus === label).length,
    }));

    const latestMonth = monthlyTrendsData.reduce((latest, item, index) => (
      item.revenue || item.expenses ? { ...item, index } : latest
    ), { month: 'No activity', revenue: 0, expenses: 0, profit: 0, index: -1 });
    const margin = latestMonth.revenue > 0
      ? Math.round((latestMonth.profit / latestMonth.revenue) * 100)
      : 0;

    return {
      cashFlow: {
        received: metrics.paidSales,
        paid: metrics.paidPurchases,
        net: metrics.paidSales - metrics.paidPurchases,
      },
      paymentSummary: {
        items: paymentItems,
        outstanding: metrics.totalReceivables + metrics.totalPayables,
      },
      monthlyInsight: {
        month: latestMonth.month,
        revenue: latestMonth.revenue,
        expenses: latestMonth.expenses,
        profit: latestMonth.profit,
        margin,
      },
    };
  }, [metrics, monthlyTrendsData]);

  const kpiCards = [
    {
      title: 'Total Sales',
      value: formatCurrency(metrics.totalSales),
      subtitle: `${formatCurrency(metrics.paidSales)} Received`,
      badge: 'Revenue',
      icon: <ArrowUpRight className="h-4 w-4" />
    },
    {
      title: 'Total Purchases',
      value: formatCurrency(metrics.totalPurchases),
      subtitle: `${formatCurrency(metrics.paidPurchases)} Paid`,
      badge: 'Expense',
      icon: <ReceiptText className="h-4 w-4" />
    },
    {
      title: 'Gross Profit',
      value: formatCurrency(metrics.grossProfit),
      subtitle: metrics.grossProfit >= 0 ? 'Margin Positive' : 'Margin Deficit',
      badge: metrics.grossProfit >= 0 ? 'Profit' : 'Loss',
      icon: <CircleDollarSign className="h-4 w-4" />
    },
    {
      title: 'Accounts Receivable',
      value: formatCurrency(metrics.totalReceivables),
      subtitle: 'Pending Collections',
      badge: 'Receivable',
      icon: <WalletCards className="h-4 w-4" />
    },
    {
      title: 'Accounts Payable',
      value: formatCurrency(metrics.totalPayables),
      subtitle: 'Pending Vendor Bills',
      badge: 'Payable',
      icon: <CalendarDays className="h-4 w-4" />
    },
  ];

  const chartColors = theme.colors.chart;

  return (
    <div className={theme.elements.div.pageWrapper}>
      <div className="mx-auto max-w-[1480px] space-y-7">

        {/* 1. DASHBOARD HEADER */}
        <div className="flex flex-col gap-5 border-b border-stone-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <Heading level="h1">Dashboard Overview</Heading>
            </div>
            <Text variant="sm" className="mt-1 max-w-xl text-slate-500 dark:text-slate-400">
              Financial summary and analytical visualization of Purchase & Sale books.
            </Text>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <Button variant="secondary" onClick={exportReport} disabled={exportState === 'exporting'}>
                {exportState === 'exporting' ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <ArrowDownToLine className="h-3.5 w-3.5" />}
                {exportState === 'exporting' ? 'Exporting...' : 'Export Report'}
              </Button>
              <Button variant="primary">
                <FilePlus2 className="h-3.5 w-3.5" />
                New Invoice
              </Button>
            </div>
            {exportMessage && (
              <div
                role="status"
                className={`flex items-center gap-1.5 text-[11px] ${exportState === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}
              >
                {exportState === 'error' ? <AlertCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                {exportMessage}
              </div>
            )}
          </div>
        </div>

        {/* 2. FINANCIAL METRIC CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiCards.map((card, idx) => (
            <MetricCard key={idx} {...card} />
          ))}
        </div>

        <FinancialOverview {...financialOverview} />

        {/* 3. FINANCIAL ANALYTICS SECTION */}
        <ChartCard
          title="Financial Analytics & Revenue Trends"
          subtitle="Monthly cash flow comparison of Revenue, Expenses, and Net Profit"
          actionButton={
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end pr-4 border-r border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total Sales
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-500 leading-tight">
                  {formatCurrency(metrics.totalSales)}
                </span>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-100/70 p-1 dark:border-slate-700 dark:bg-slate-800">
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
          <div className="w-full h-[360px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={monthlyTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.revenue} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColors.revenue} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.expenses} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColors.expenses} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.profit} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColors.profit} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={{ stroke: chartColors.grid }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={false} tickLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip
                    formatter={(value, name) => [formatCurrency(value), name]}
                    contentStyle={{
                      backgroundColor: chartColors.tooltip,
                      borderColor: chartColors.grid,
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke={chartColors.revenue} fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                  <Area type="monotone" dataKey="expenses" name="Expenses" stroke={chartColors.expenses} fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
                  <Area type="monotone" dataKey="profit" name="Net Profit" stroke={chartColors.profit} fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
                </AreaChart>
              ) : (
                <BarChart data={monthlyTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={{ stroke: chartColors.grid }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={false} tickLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value, name) => [formatCurrency(value), name]} contentStyle={{ backgroundColor: chartColors.tooltip, borderColor: chartColors.grid, borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }} />
                  <Bar dataKey="revenue" name="Revenue" fill={chartColors.revenue} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill={chartColors.expenses} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Net Profit" fill={chartColors.profit} radius={[4, 4, 0, 0]} />
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