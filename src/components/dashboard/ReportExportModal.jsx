import React, { useRef, useState } from 'react';
import { Download, FileText, X, Image as ImageIcon, Loader2, BarChart2, ChevronDown, Table, Database, Sheet } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

// Added missing imports
import MetricCard from '../dashboard/MetricCards';
import SalesChart from '../dashboard/AnalyticsChart';

export default function ReportExportModal({ isOpen, onClose, kpis, fileName, currency }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const captureRef = useRef(null);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedCurrencySymbol = currency?.symbol || '$';

  // 1. PDF Export Function
  const handleDownloadPdf = async () => {
    const element = captureRef.current;
    if (!element) return;

    const opt = {
      margin: [0.3, 0.3, 0.3, 0.3],
      filename: `ERP_Financial_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#020617' },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
    };

    await html2pdf().set(opt).from(element).save();
  };

  // 2. High-Res PNG Image Export Function
  const handleDownloadPng = async () => {
    const element = captureRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#020617',
    });

    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = `ERP_Dashboard_Slide_${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Excel Worksheet Export Function (.csv / .xlsx format)
  const handleDownloadExcel = () => {
    const headers = ['Metric Title', `Amount (${formattedCurrencySymbol})`, 'View Type', 'Source File'];
    const rows = [
      ['Total Active Revenue', kpis.activeRevenue || 0, kpis.accountingMethod || 'Accrual', fileName],
      ['Total Active Expenses', kpis.activeExpenses || 0, kpis.accountingMethod || 'Accrual', fileName],
      ['Net Profit', kpis.netProfit || 0, kpis.accountingMethod || 'Accrual', fileName],
      ['Tax / VAT Liability', kpis.taxCollected || 0, kpis.accountingMethod || 'Accrual', fileName],
      ['Accounts Receivable (AR)', kpis.pendingReceivables || 0, kpis.accountingMethod || 'Accrual', fileName],
      ['Accounts Payable (AP)', kpis.pendingPayables || 0, kpis.accountingMethod || 'Accrual', fileName],
      ['Total Transactions', kpis.totalTransactions || 0, '-', fileName],
    ];

    let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
    rows.forEach((rowArray) => {
      csvContent += rowArray.join(',') + '\n';
    });

    if (kpis.chartData && Array.isArray(kpis.chartData)) {
      csvContent += '\n\nMonthly Breakdown\nMonth,Sales,Purchases\n';
      kpis.chartData.forEach((item) => {
        csvContent += `${item.name || 'N/A'},${item.Sales || 0},${item.Purchases || 0}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `ERP_Financial_Summary_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. Tableau Prepared CSV/Data Model Export Function
  const handleDownloadTableau = () => {
    const headers = ['Record_ID', 'Period_Month', 'Metric_Category', 'Value_Amount', 'Currency', 'Accounting_View', 'Source_File', 'Export_Date'];
    
    let rows = [];
    if (kpis.chartData && Array.isArray(kpis.chartData)) {
      kpis.chartData.forEach((item, index) => {
        rows.push([index + 1, item.name || 'N/A', 'Sales', item.Sales || 0, currency?.code || 'USD', kpis.accountingMethod, fileName, currentDate]);
        rows.push([index + 101, item.name || 'N/A', 'Purchases', item.Purchases || 0, currency?.code || 'USD', kpis.accountingMethod, fileName, currentDate]);
      });
    } else {
      rows.push([1, 'Summary', 'Revenue', kpis.activeRevenue || 0, currency?.code || 'USD', kpis.accountingMethod, fileName, currentDate]);
      rows.push([2, 'Summary', 'Expenses', kpis.activeExpenses || 0, currency?.code || 'USD', kpis.accountingMethod, fileName, currentDate]);
    }

    let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
    rows.forEach((rowArray) => {
      csvContent += rowArray.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `Tableau_ERP_Dataset_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Central Export Dispatcher
  const handleExecuteExport = async () => {
    setIsExporting(true);
    try {
      if (exportType === 'pdf') await handleDownloadPdf();
      else if (exportType === 'png') await handleDownloadPng();
      else if (exportType === 'excel') handleDownloadExcel();
      else if (exportType === 'tableau') handleDownloadTableau();
    } catch (error) {
      console.error("Export Error:", error);
    } finally {
      setIsExporting(false);
      setIsDropdownOpen(false);
    }
  };

  const exportOptions = [
    { id: 'pdf', label: 'PDF Document (.pdf)', icon: FileText, desc: 'For Bank Managers & Official Audits' },
    { id: 'png', label: 'High-Res PNG Image (.png)', icon: ImageIcon, desc: 'For Investor Pitch Decks & Slides' },
    { id: 'excel', label: 'Excel Workbook (.csv / .xlsx)', icon: Sheet, desc: 'Structured Financial Metrics & Monthly Sheets' },
    { id: 'tableau', label: 'Tableau Dataset (.csv)', icon: Database, desc: 'Clean Analytical Dataset Ready for Tableau' },
  ];

  const currentSelectedOption = exportOptions.find((opt) => opt.id === exportType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full p-6 shadow-2xl space-y-6 my-8">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Export Financial Dashboard</h2>
              <p className="text-xs text-slate-400">Select desired export format for banks, investors, Excel, or Tableau</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Custom Dropdown Control */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all"
              >
                {currentSelectedOption && <currentSelectedOption.icon className="w-4 h-4 text-indigo-400" />}
                <span>{currentSelectedOption?.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                  {exportOptions.map((option) => {
                    const IconComp = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setExportType(option.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-indigo-600/10 transition-all ${
                          exportType === option.id ? 'bg-indigo-600/20 border-l-4 border-indigo-500' : ''
                        }`}
                      >
                        <IconComp className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-slate-100">{option.label}</p>
                          <p className="text-[10px] text-slate-400">{option.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Execute Download Button */}
            <button
              onClick={handleExecuteExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Download Report
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Capture Area for Visual Exports */}
        <div className="overflow-x-auto max-h-[70vh] p-2">
          <div ref={captureRef} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 min-w-[850px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-6 h-6 text-indigo-400" /> Executive Financial Overview
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Source: <span className="text-indigo-400 font-medium">{fileName}</span> ({kpis.totalTransactions} Records) | Accounting: <span className="uppercase font-semibold text-emerald-400">{kpis.accountingMethod} View</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Date: <span className="text-slate-200 font-semibold">{currentDate}</span></p>
                <p className="text-xs text-indigo-400 font-medium mt-0.5">Verified ERP Snapshot</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <MetricCard title="Revenue" amount={kpis.activeRevenue} currency={currency} color="emerald" iconName="sales" />
              <MetricCard title="Expenses" amount={kpis.activeExpenses} currency={currency} color="rose" iconName="purchase" />
              <MetricCard title="Net Profit" amount={kpis.netProfit} currency={currency} color="indigo" iconName="profit" />
              <MetricCard title="Tax Liability" amount={kpis.taxCollected} currency={currency} color="amber" iconName="receivable" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MetricCard title="Accounts Receivable" amount={kpis.pendingReceivables} currency={currency} color="amber" iconName="receivable" />
              <MetricCard title="Accounts Payable" amount={kpis.pendingPayables} currency={currency} color="purple" iconName="payable" />
            </div>

            <div className="pt-2">
              <SalesChart data={kpis.chartData} currency={currency} title="Monthly Trend Analysis" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}