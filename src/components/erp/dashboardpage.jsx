import React, { useState, useMemo } from 'react';
import { 
  RefreshCw, 
  BarChart2, 
  Globe, 
  Download, 
  Percent 
} from 'lucide-react';
import MetricCard from '../dashboard/MetricCards';
import SalesChart from '../dashboard/AnalyticsChart';
import CashFlowForecast from '../erp/CashFlowForecast';
import CustomerSupplierAnalysis from '../erp/CustomerSupplierAnalysis'; // 👈 Customer & Supplier Analysis Component
import ReportExportModal from '../dashboard/ReportExportModal';
import FileUploadView from '../erp/FileUploadView';

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)', locale: 'en-US' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)', locale: 'en-GB' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)', locale: 'de-DE' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)', locale: 'en-IN' },
  { code: 'PKR', symbol: 'Rs.', label: 'PKR (Rs.)', locale: 'en-PK' },
];

const findColumnKey = (row, keywords) => {
  const keys = Object.keys(row || {});
  return keys.find((key) => 
    keywords.some((kw) => key.toLowerCase().replace(/[^a-z0-9]/g, '').includes(kw))
  );
};

export default function Dashboard() {
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [currencyCode, setCurrencyCode] = useState('USD');
  const [accountingMethod, setAccountingMethod] = useState('accrual');
  const [taxRate, setTaxRate] = useState(20);

  const currentCurrency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  }, [currencyCode]);

  const handleDownloadSampleTemplate = () => {
    const csvHeader = 'Invoice_ID,Date,Description,Category,Type,Party_Name,Total_Amount,Paid_Amount\n';
    const sampleRows = [
      'INV-001,2026-01-15,Consulting Services,Revenue,SALE,Acme Corp,5000,5000',
      'INV-002,2026-01-20,SaaS Hosting Subscription,Software,PURCHASE,AWS,1200,1200',
      'INV-003,2026-02-05,Marketing Services,Marketing,SALE,Starlight Studio,3500,2000',
      'INV-004,2026-02-18,Office Equipment,Operations,PURCHASE,Supplies Co,450,450',
    ].join('\n');

    const blob = new Blob([csvHeader + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Universal_Financial_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProceedToDashboard = (parsedData, uploadedFileName) => {
    setExcelData(parsedData);
    setFileName(uploadedFileName);
  };

  const handleReset = () => {
    setExcelData(null);
    setFileName('');
  };

  // KPIs & 30-Day Cash Flow Calculations
  const kpis = useMemo(() => {
    if (!excelData || !Array.isArray(excelData) || excelData.length === 0) {
      return {
        totalSales: 0,
        totalPurchases: 0,
        activeRevenue: 0,
        activeExpenses: 0,
        netProfit: 0,
        pendingReceivables: 0,
        pendingPayables: 0,
        totalReceived: 0,
        totalPaid: 0,
        taxCollected: 0,
        netRevenueExTax: 0,
        totalTransactions: 0,
        chartData: [],
        forecast: { currentCash: 0, expectedIn: 0, expectedOut: 0, chartData: [] }
      };
    }

    const firstRow = excelData[0] || {};

    const amountKey = findColumnKey(firstRow, ['totalamount', 'amount', 'total', 'price', 'val', 'cost', 'net', 'revenue']) ||
      Object.keys(firstRow).find(k => typeof firstRow[k] === 'number') || Object.keys(firstRow)[0];

    const paidKey = findColumnKey(firstRow, ['paidamount', 'paid', 'received', 'payment']);
    const typeKey = findColumnKey(firstRow, ['type', 'category', 'status', 'kind', 'transaction']);
    const dateKey = findColumnKey(firstRow, ['date', 'time', 'day', 'month', 'year']);

    let grossSales = 0;
    let grossPurchases = 0;
    let pendingReceivables = 0;
    let pendingPayables = 0;
    let totalReceived = 0;
    let totalPaid = 0;

    const groupMap = {};

    excelData.forEach((row) => {
      const rawVal = row[amountKey];
      const amount = typeof rawVal === 'number' ? rawVal : parseFloat(String(rawVal || '0').replace(/[^0-9.-]+/g, '')) || 0;
      const paid = paidKey ? (parseFloat(String(row[paidKey] || '0').replace(/[^0-9.-]+/g, '')) || 0) : amount;

      const typeVal = String(row[typeKey] || '').toUpperCase();
      const rawDate = dateKey ? row[dateKey] : null;

      let groupKey = 'General';
      if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate.getTime())) {
          groupKey = parsedDate.toLocaleString('default', { month: 'short' });
        } else {
          groupKey = String(rawDate);
        }
      } else if (typeKey && row[typeKey]) {
        groupKey = String(row[typeKey]);
      }

      if (!groupMap[groupKey]) {
        groupMap[groupKey] = { name: groupKey, Sales: 0, Purchases: 0 };
      }

      const isExpense = typeVal.includes('PURCHASE') || typeVal.includes('EXPENSE') || typeVal.includes('BILL') || typeVal.includes('OUT') || amount < 0;

      if (isExpense) {
        const absAmt = Math.abs(amount);
        grossPurchases += absAmt;
        totalPaid += paid;
        pendingPayables += (absAmt - paid);
        groupMap[groupKey].Purchases += (accountingMethod === 'accrual' ? absAmt : paid);
      } else {
        grossSales += amount;
        totalReceived += paid;
        pendingReceivables += (amount - paid);
        groupMap[groupKey].Sales += (accountingMethod === 'accrual' ? amount : paid);
      }
    });

    const activeRevenue = accountingMethod === 'accrual' ? grossSales : totalReceived;
    const activeExpenses = accountingMethod === 'accrual' ? grossPurchases : totalPaid;

    const rateFactor = taxRate > 0 ? 1 + taxRate / 100 : 1;
    const netRevenueExTax = activeRevenue / rateFactor;
    const taxCollected = activeRevenue - netRevenueExTax;
    const netProfit = activeRevenue - activeExpenses;

    const chartData = Object.values(groupMap);

    // 💡 30-Day Cash Flow Forecast Calculation
    const currentCash = totalReceived - totalPaid;
    const expectedIn = pendingReceivables;
    const expectedOut = pendingPayables;

    const forecastChartData = [
      { timeframe: 'Today', cash: Math.round(currentCash) },
      { timeframe: '7 Days', cash: Math.round(currentCash + expectedIn * 0.25 - expectedOut * 0.2) },
      { timeframe: '14 Days', cash: Math.round(currentCash + expectedIn * 0.60 - expectedOut * 0.5) },
      { timeframe: '30 Days', cash: Math.round(currentCash + expectedIn - expectedOut) }
    ];

    return {
      totalSales: grossSales,
      totalPurchases: grossPurchases,
      activeRevenue,
      activeExpenses,
      netRevenueExTax,
      taxCollected,
      netProfit,
      pendingReceivables,
      pendingPayables,
      totalReceived,
      totalPaid,
      totalTransactions: excelData.length,
      chartData: chartData.length > 0 ? chartData : [{ name: 'Summary', Sales: activeRevenue, Purchases: activeExpenses }],
      forecast: {
        currentCash,
        expectedIn,
        expectedOut,
        chartData: forecastChartData
      }
    };
  }, [excelData, accountingMethod, taxRate]);

  if (!excelData) {
    return (
      <FileUploadView
        onProceedToDashboard={handleProceedToDashboard}
        onDownloadSampleTemplate={handleDownloadSampleTemplate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation & Controls Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-slate-900 p-5 rounded-2xl border border-slate-800 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-indigo-400" /> Executive Financial Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              File: <span className="text-indigo-400 font-medium">{fileName}</span> | View: <span className="text-emerald-400 font-bold uppercase">{accountingMethod} Accounting</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setAccountingMethod('accrual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  accountingMethod === 'accrual' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Accrual Method
              </button>
              <button
                onClick={() => setAccountingMethod('cash')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  accountingMethod === 'cash' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cash Basis
              </button>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
              <Percent className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">VAT / Sales Tax:</span>
              <input
                type="number"
                min="0"
                max="100"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-12 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white text-center font-semibold focus:outline-none focus:border-indigo-500"
              />
              <span className="text-slate-400">%</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl">
              <Globe className="w-4 h-4 text-indigo-400" />
              <select
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="bg-transparent text-xs text-slate-200 font-semibold border-none focus:outline-none cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-slate-100">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" /> Export Report
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-medium rounded-xl transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Core KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title={accountingMethod === 'accrual' ? 'Gross Revenue (Invoiced)' : 'Cash Inflow (Collected)'} 
            amount={kpis.activeRevenue} 
            currency={currentCurrency}
            color="emerald" 
            iconName="sales" 
            subtitle={accountingMethod === 'accrual' ? 'Total Invoiced Sales' : 'Actual Cash Received'}
          />
          <MetricCard 
            title={accountingMethod === 'accrual' ? 'Total Expenses (Billed)' : 'Cash Outflow (Paid)'} 
            amount={kpis.activeExpenses} 
            currency={currentCurrency}
            color="rose" 
            iconName="purchase" 
            subtitle={accountingMethod === 'accrual' ? 'Operating Bills & Outgoings' : 'Actual Cash Spent'}
          />
          <MetricCard 
            title="Net Operating Profit" 
            amount={kpis.netProfit} 
            currency={currentCurrency}
            color="indigo" 
            iconName="profit" 
            subtitle={`Calculated via ${accountingMethod.toUpperCase()} Method`}
          />
          <MetricCard 
            title={`Est. VAT / Tax Collected (${taxRate}%)`} 
            amount={kpis.taxCollected} 
            currency={currentCurrency}
            color="amber" 
            iconName="receivable" 
            subtitle="Estimated Tax Liability"
          />
        </div>

        {/* 💰 30-DAY CASH FLOW FORECAST COMPONENT */}
        <CashFlowForecast 
          currentCash={kpis.forecast.currentCash}
          expectedIn={kpis.forecast.expectedIn}
          expectedOut={kpis.forecast.expectedOut}
          chartData={kpis.forecast.chartData}
          currency={currentCurrency}
        />

        {/* 👥 CUSTOMER & SUPPLIER ANALYSIS COMPONENT */}
        <CustomerSupplierAnalysis 
          rawData={excelData} 
          currency={currentCurrency} 
        />

        {/* Sub-Ledger & Working Capital Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Accounts Receivable (AR)" 
            amount={kpis.pendingReceivables} 
            currency={currentCurrency}
            color="amber" 
            iconName="receivable" 
            subtitle="Unpaid Customer Invoices"
          />
          <MetricCard 
            title="Accounts Payable (AP)" 
            amount={kpis.pendingPayables} 
            currency={currentCurrency}
            color="purple" 
            iconName="payable" 
            subtitle="Outstanding Vendor Bills"
          />
          <MetricCard 
            title="Net Turnover (Excl. Tax)" 
            amount={kpis.netRevenueExTax} 
            currency={currentCurrency}
            color="sky" 
            iconName="received" 
            subtitle="Revenue Excluding VAT/Tax"
          />
          <MetricCard 
            title="Processed Records" 
            amount={kpis.totalTransactions} 
            currency={{ ...currentCurrency, symbol: '' }}
            color="indigo" 
            iconName="paid" 
            subtitle="Parsed Data Rows"
          />
        </div>

        {/* Analytics Chart */}
        <SalesChart 
          data={kpis.chartData} 
          currency={currentCurrency} 
          title={`Financial Comparison (${accountingMethod === 'accrual' ? 'Revenue vs Expenses' : 'Cash Inflow vs Outflow'})`}
        />

        <ReportExportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          kpis={{ ...kpis, accountingMethod, taxRate }}
          fileName={fileName}
          currency={currentCurrency}
        />
      </div>
    </div>
  );
}