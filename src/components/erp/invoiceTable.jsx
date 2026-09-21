// src/components/erp/InvoiceTable.jsx
import React, { useState } from 'react';
import { mockData } from '../../data/generateErpData';
import { useTableFilter } from '../hook/useTableFilter';
import FilterBar from '../dashboard/FilterBar';
import InvoiceModalForm from '../erp/InvoiceFormModal';
import InvoicePrint from '../erp/InvoicePrint';

const InvoiceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

// Table component ke andar:
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedInvoice, setSelectedInvoice] = useState(null);


  // Reusable Hook Se Filters Aur Data Extract Karein
  const {
    filteredData,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusFilter,
    setStatusFilter,
    resetFilters
  } = useTableFilter(mockData);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="p-6 bg-slate-900 text-slate-100 min-h-screen font-sans">
      {/* Header */}
<button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg">
  + Add Invoice
</button>

// Render components:
<InvoiceModalForm 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  onAddInvoice={(newInv) => console.log(newInv)} 
/>

<InvoicePrint 
  invoice={selectedInvoice} 
  onClose={() => setSelectedInvoice(null)} 
/>



      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-400">ERP Purchase & Sale Book</h1>
        <p className="text-sm text-slate-400">Total Records Loaded: {mockData.length}</p>
      </div>

      {/* Reusable FilterBar */}
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        resetFilters={resetFilters}
        onFilterChange={() => setCurrentPage(1)}
      />

      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        {['ALL', 'PURCHASE', 'SALE'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1); // Reset page on tab change
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === tab
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {tab === 'ALL' ? 'All Records' : tab === 'PURCHASE' ? 'Purchase Book' : 'Sale Book'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-slate-800/50 border border-slate-700/60 rounded-xl shadow-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-700">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Invoice No</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Party Name</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Tax (18%)</th>
              <th className="px-4 py-3 text-right">Total Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/80 transition-colors">
                  <td className="px-4 py-3 font-semibold">
                    <span className={`px-2 py-1 text-xs rounded ${
                      row.type === 'PURCHASE' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-amber-300">{row.invoiceNo}</td>
                  <td className="px-4 py-3 text-slate-300">{row.date}</td>
                  <td className="px-4 py-3 font-medium text-white">{row.partyName}</td>
                  <td className="px-4 py-3 text-right text-slate-300">${row.subtotal.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-slate-400">${row.taxAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-bold text-amber-400">${row.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      row.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' :
                      row.paymentStatus === 'Partial' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {row.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-slate-500">
                  No records found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-xs text-slate-400">
        <div>
          Showing {filteredData.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} records
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-3 py-1.5 bg-slate-800 text-amber-400 rounded font-semibold">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;