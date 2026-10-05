import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  FileDown, 
  AlertTriangle, 
  AlertCircle, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { parseErpExcel } from '../utils/excelParser';

export default function FileUploadView({
  onProceedToDashboard,
  onDownloadSampleTemplate,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [healthData, setHealthData] = useState(null);
  const [showIssuesList, setShowIssuesList] = useState(false);
  const [parsedRows, setParsedRows] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Helper to search column names flexibly
  const findKey = (row, keywords) => {
    const keys = Object.keys(row || {});
    return keys.find((k) =>
      keywords.some((kw) => k.toLowerCase().replace(/[^a-z0-9]/g, '').includes(kw))
    );
  };

  const handleFileAnalysis = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setUploadedFileName(file.name);

    try {
      const data = await parseErpExcel(file);
      if (!data || data.length === 0) {
        throw new Error('Selected file is empty or unreadable.');
      }

      setParsedRows(data);
      analyzeHealth(data);
    } catch (err) {
      setError(err?.message || 'Error processing Excel file.');
    } finally {
      setLoading(false);
    }
  };

  const analyzeHealth = (rows) => {
    const totalRows = rows.length;
    const firstRow = rows[0] || {};

    const nameKey = findKey(firstRow, ['customer', 'party', 'client', 'vendor', 'name', 'account']);
    const dateKey = findKey(firstRow, ['date', 'time', 'period', 'invdate']);
    const invKey = findKey(firstRow, ['invoice', 'inv', 'bill', 'id', 'ref', 'number', 'code']);

    let missingNames = 0;
    let missingDates = 0;
    let duplicateInvoices = 0;
    const seenInvoices = new Set();
    const issueDetails = [];

    rows.forEach((row, idx) => {
      const rowNum = idx + 2; // Excel row numbering (Header is row 1)
      
      // Missing Name Check
      if (nameKey && (!row[nameKey] || String(row[nameKey]).trim() === '')) {
        missingNames++;
        issueDetails.push({ row: rowNum, type: 'Missing Party/Customer Name', severity: 'warning' });
      }

      // Missing Date Check
      if (dateKey && (!row[dateKey] || String(row[dateKey]).trim() === '')) {
        missingDates++;
        issueDetails.push({ row: rowNum, type: 'Missing Transaction Date', severity: 'warning' });
      }

      // Duplicate Invoice Check
      if (invKey && row[invKey]) {
        const invVal = String(row[invKey]).trim();
        if (seenInvoices.has(invVal)) {
          duplicateInvoices++;
          issueDetails.push({ row: rowNum, type: `Duplicate Invoice ID (${invVal})`, severity: 'critical' });
        } else {
          seenInvoices.add(invVal);
        }
      }
    });

    const invalidCount = Math.min(totalRows, missingNames + missingDates + duplicateInvoices);
    const validRows = Math.max(0, totalRows - invalidCount);

    setHealthData({
      totalRows,
      validRows,
      missingNames,
      missingDates,
      duplicateInvoices,
      issueDetails,
    });
  };

  const handleContinue = () => {
    onProceedToDashboard(parsedRows, uploadedFileName);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-4 border border-indigo-500/20">
            <FileSpreadsheet className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Universal Excel Financial Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Upload any Excel or CSV sheet to instantly generate a financial dashboard.
          </p>
        </div>

        {/* Sample Template Download */}
        {!healthData && (
          <div className="mb-6 bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-xl flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-200">
                Need a sample reference?
              </p>
              <p className="text-xs text-slate-400">
                Optional template available for demo data structure.
              </p>
            </div>
            <button
              onClick={onDownloadSampleTemplate}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shrink-0"
            >
              <FileDown className="w-4 h-4" /> Download Sample
            </button>
          </div>
        )}

        {/* File Dropzone (Hidden when Health Check is active) */}
        {!healthData && (
          <div className="border-2 border-dashed border-slate-600 hover:border-indigo-500 transition-colors rounded-xl p-8 text-center bg-slate-800/50 mb-6 relative group">
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileAnalysis}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-10 h-10 mx-auto text-slate-400 group-hover:text-indigo-400 transition-colors mb-3" />
            <p className="text-base font-medium text-slate-200">
              Drop any Excel file here or{' '}
              <span className="text-indigo-400 underline">Browse</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports .xlsx, .xls, .csv files with any custom columns
            </p>
          </div>
        )}

        {loading && (
          <p className="text-center text-indigo-400 text-sm font-medium animate-pulse mb-4">
            Analyzing Excel structure & running data health check...
          </p>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* 🧹 EXCEL DATA HEALTH CHECK CARD */}
        {healthData && (
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 mb-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Data Health Summary</h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                {uploadedFileName}
              </span>
            </div>

            <p className="text-sm text-slate-400 font-medium mb-4">
              <span className="text-white font-semibold">{healthData.totalRows} rows</span> uploaded
            </p>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>🟢 {healthData.validRows} valid rows ready for dashboard</span>
              </div>

              {healthData.missingNames > 0 && (
                <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-300 font-medium">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>🟡 {healthData.missingNames} missing customer/party names</span>
                </div>
              )}

              {healthData.missingDates > 0 && (
                <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-300 font-medium">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>🟡 {healthData.missingDates} missing transaction dates</span>
                </div>
              )}

              {healthData.duplicateInvoices > 0 && (
                <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-300 font-medium">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>🔴 {healthData.duplicateInvoices} duplicate invoice IDs</span>
                </div>
              )}
            </div>

            {/* Actions: Review Issues & Continue */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {healthData.issueDetails.length > 0 && (
                <button
                  onClick={() => setShowIssuesList(!showIssuesList)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {showIssuesList ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Review Issues ({healthData.issueDetails.length})
                </button>
              )}

              <button
                onClick={handleContinue}
                className="w-full sm:flex-1 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                Continue Anyway <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Detailed Issues List */}
            {showIssuesList && healthData.issueDetails.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800 max-h-48 overflow-y-auto space-y-2 pr-1">
                {healthData.issueDetails.map((issue, i) => (
                  <div key={i} className="text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 font-mono">Row {issue.row}</span>
                    <span className={issue.severity === 'critical' ? 'text-rose-400 font-medium' : 'text-amber-400 font-medium'}>
                      {issue.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Feature Highlights */}
        {!healthData && (
          <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-700/60">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Automatic Column Recognition & Health Check:
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Any Amount / Price / Total
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Any Date / Time Field
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Duplicate Invoices Audit
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Missing Customer/Party Detect
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}